---
layout: post
title:  "6 compelling use cases for ES6 proxies"
date:   2017-07-08
categories: js
---

Is it just me, or did proxies seem to get lost in the fanfare over all the other ES6 features? This may be due to [slow or limited support in Safari](https://kangax.github.io/compat-table/es6/#test-Proxy,_internal_%27get%27_calls) (no versions support it), Node (v6 is the first to support it), and popular transpilers (Babel/TypeScript). Also, as proxies are a metaprogramming feature, their uses are less apparent than the new class syntax, arrow functions, destructuring and the rest.

I’m pretty jazzed about ES6 proxies though. They’re a concise and semantic construct for moderating access to objects in JS applications.

In this post, I’m going to do my best at explaining how they work and then list several practical ways I think you could make use of them.

## What is a proxy?
In real life, a proxy is a person who has authority to represent someone else. For example, many states allow proxy voting, which means you can authorize someone to represent you at the polls and cast a vote on your behalf.

Proxies are also a common paradigm in tech. You’ve probably heard of proxy servers which take all your requests/traffic, route them to another destination on your behalf, and return the responses to you. Using a proxy server is useful when you don’t want the destination of your traffic (e.g. nsa.gov) to know where your traffic originated from. All the destination server sees is that a request came from the proxy server.

Inching closer to the point of this post, proxies are also a common [design pattern](https://en.wikipedia.org/wiki/Proxy_pattern) in application programming. This kind of proxy is a close analogue to what ES6 proxies are intended to do, and involves wrapping a class (A) with another class (B) to intercept/control access to it (A).

**The proxy pattern is generally useful when you want to:**

- intercept or control access to an object
- reduce method/class complexity by obscuring routine or auxiliary logic
- prevent resource-heavy actions without validation/preparation first

## Proxies in ES6

The Proxy constructor is accessible on the global object. Using it, you can effectively stand between objects and the various operations that are performed on them, collect information about the request, and return whatever you'd like. In this way, proxies have a lot in common with middleware.

Specifically, proxies allow you to intercept references to many of the methods you would commonly call on an object or its properties, the most common being get, set, apply (for functions) and construct (for functions called with the new keyword). For a complete list of methods you can intercept with proxies, [see the spec](http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots). Proxies can also be configured to stop accepting requests at any time, effectively revoking all access to the object they serve as proxy for. This is accomplished with a revoke method I'll talk more about later.

## Terminology
Before we go further, there are three terms you need to know: target, handler, and trap.

target refers to the object the proxy represents. It's the object you want to moderate access to. It is always passed as the first argument to the Proxy constructor, and is also passed into each trap (more on this in, like, two lines).

A handler is an object that contains the operations you want to intercept and handle. It's passed as the second argument to the Proxy constructor. It implements the Proxy API (ie: get, set, apply, etc).

A trap is the term for a function referenced in the handler to handle a given method. So you'll define a get trap if you're going to intercept get calls, and so on.

One last thing: you should also know about the Reflect API, which is also accessible on the global object. I'm going to defer to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect) on what it is, because it explains Reflect succinctly, and also because it's one of those things you'll just get when you see it. Trust me.

## Basic usage
Before I get into what I see as some interesting use cases for Proxies, here’s a ‘hello world’ example. For a more thorough and step-by-step introduction to using proxies, check out Nicholas Zakas’ chapter in [Understanding ES6](https://leanpub.com/understandinges6/read#leanpub-auto-proxies-and-the-reflection-api) on them. It’s outstanding, and free to read online.

{% highlight javascript %}

const dataStore = {
  name: 'Billy Bob',
  age: 15
};

const handler = {
  get(target, key, proxy) {
    const today = new Date();
    console.log(GET request made for ${key} at ${today});
    return Reflect.get(target, key, proxy);
  }
}

const dataStoreProxy = new Proxy(dataStore, handler);

// This calls our handler, logs the request, and sets `name`
const name = dataStoreProxy.name;

{% endhighlight %}

## ES6 Proxy use cases
You may already have some ideas about what you could use proxies for. Here are some I have.

### 1. Abstracting away validation code
A simple example of using proxies for validation — which Zakas gives in his book — is to ensure that all properties in a data store are of the same type. Below we ensure that any time someone attempts to set a property in our numericDataStore, that the new value is a number.

{% highlight javascript %}
const numericDataStore = { count: 0, amount: 1234, total: 14 };
const storeProxy = new Proxy(numericDataStore, {
  set(target, key, value, proxy) {
    if (typeof value !== 'number') {
      throw Error("Nope! I need a number!");
    }

    return Reflect.set(target, key, value, proxy);
  }
});
// this will throw an error
storeProxy.count = "foo";
// this will set the new value as expected
storeProxy.count = 333;

{% endhighlight %}

This is interesting, but how often do you create objects with properties of all the same type?

If you wanted to write custom validators for some or all properties on an object, the code gets slightly more complex, but I love how proxies help you separate the validation code from more central logic. Am I the only one who hates mucking up methods and classes with validation code?

{% highlight javascript %}

function createValidator(target, validator) {
  return new Proxy(target, {
    validator: validator,
    set(target, key, value, proxy) {
      if (target.hasOwnProperty(key)) {
        const validator = this._validator[key];
        if (validator(value)) {
          return Reflect.set(target, key, value, proxy);
        } else {
          throw Error(Cannot set ${key} to ${value}. Invalid.);
        }
      } else {
        throw Error(${key} is not a valid property)
      }
    }
  });
}

const personValidators = {
  name(val) {
    return typeof val === 'string';
  },
  age(val) {
    return typeof age === 'number' && age > 18;
  }
};
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    return createValidator(this, personValidators);
  }
}

const bill = new Person('Bill', 25);

// all of these throw an error
bill.name = 0;
bill.age = 'Bill';
bill.age = 15;

{% endhighlight %}

This way, you can expand your validation code indefinitely without having to change your class/methods.

One more idea related to validation. Let’s say you want to check the values being passed to a certain method and log helpful warnings when the signature has been implemented incorrectly. You can do this with proxies, while keeping the type-checking code out of the way.

{% highlight javascript %}
const obj = {
  pickyMethodOne: function(obj, str, num) { },
  pickyMethodTwo: function(num, obj) { }
};

const argTypes = {
  pickyMethodOne: ["object", "string", "number"],
  pickyMethodTwo: ["number", "object"]
};

const objProxy = new Proxy(obj, {
  get: function(target, key, proxy) {
    var value = target[key];
    return function(...args) {
      var checkArgs = argChecker(key, args, argTypes[key]);
      return Reflect.apply(value, target, args);
    };
  }
});

function argChecker(name, args, checkers) {
  for (var idx = 0; idx < args.length; idx++) {
    var arg = args[idx];
    var type = checkers[idx];
    if (!arg || typeof arg !== type) {
      console.warn(`Check param ${idx + 1}`);
    }
  }
}

obj.pickyMethodOne();
// Check param 1
// Check param 2
// Check param 3

obj.pickyMethodTwo("wopdopadoo", {});
// > Check param 1

// No warnings logged
obj.pickyMethodOne({}, "a little string", 123);
obj.pickyMethodOne(123, {});

{% endhighlight %}

### 2. Privacy in JavaScript
I once worked with a developer who was miffed that JavaScript objects don’t come with privacy baked in. He came from Java, where you can explicitly set any property to be private (only accessible from within the class) or public (accessible internally or externally).

In JavaScript, it’s conventional to use underscores (or other characters) before and/or after a property to signal that it’s for internal use only. But that doesn’t stop someone from peeking at or changing it anyway.

This is the case below, where we have an apiKey we want to be accessible to the methods in the api object, but we really don't want to be accessible outside of it.

{% highlight javascript %}
var api = {
  apiKey: '123abc456def',
  getUsers: function(){},
  getUser: function(userId){},
  setUser: function(userId, config){}
};

// logs '123abc456def';
console.log("An apiKey we want to keep private", api.apiKey);

// get and mutate apiKeys as desired
var apiKey = api.apiKey;
api.apiKey = '987654321';

{% endhighlight %}

With ES6 proxies, you can achieve true and complete privacy in JavaScript, in a couple ways.

First, you can use a proxy to intercept requests to certain properties and then restrict them or just return undefined.

{% highlight javascript %}
const api = {
  apiKey: '123abc456def',
  getUsers: function(){ },
  getUser: function(userId){ },
  setUser: function(userId, config){ }
};

// Add other restricted properties to this array
const RESTRICTED = ['apiKey'];

const apiProxy = new Proxy(api, {
    get(target, key, proxy) {
        if(RESTRICTED.indexOf(key) > -1) {
            throw Error(${key} is restricted. Please see api documentation for further info.);
        }
        return Reflect.get(target, key, proxy);
    },
    set(target, key, value, proxy) {
        if(RESTRICTED.indexOf(key) > -1) {
            throw Error(${key} is restricted. Please see api documentation for further info.);
        }
        return Reflect.get(target, key, value, proxy);
    }
});

// throws an error
console.log(apiProxy.apiKey);

// throws an error
apiProxy.apiKey = '987654321';

{% endhighlight %}

You can also obscure the fact that the property exists using the has trap.

{% highlight javascript %}
const api = {
  apiKey: '123abc456def',
  getUsers: function(){ },
  getUser: function(userId){ },
  setUser: function(userId, config){ }
};

// Add other restricted properties to this array
const RESTRICTED = ['_apiKey'];

const apiProxy = new Proxy(api, {
  has(target, key) {
    return (RESTRICTED.indexOf(key) > -1) ?
      false :
      Reflect.has(target, key);
  }
});

// these log false, and for in iterators will ignore apiKey

console.log("apiKey" in apiProxy);

for (var key in apiProxy) {
  if (api.hasOwnProperty(key) && key === "apiKey") {
    console.log("This will never be logged because the proxy obscures apiKey...")
  }
}
{% endhighlight %}

### 3. Silently logging object access
For methods or interfaces that are resource intensive, slow running, and/or heavily used, you may want to log their usage and/or performance. Proxies make it easy to do this quietly in the background.

Note: Unfortunately, you can’t just use an apply trap to intercept methods. Axel Rauschmayer goes into this more [here](http://exploringjs.com/es6/ch_proxies.html#_intercepting-method-calls). The basic point is, any time you call a method, you've got to get the method first. So, if you want to intercept a method call, you need to intercept the get-ting of the method, and then intercept the apply-ing of it.

{% highlight javascript %}
const api = {
  apiKey: '123abc456def',
  getUsers: function() { },
  getUser: function(userId) { },
  setUser: function(userId, config) {  }
};

const apiProxy = new Proxy(api, {
  get: function(target, key, proxy) {
    var value = target[key];
    return function(...arguments) {
      logMethodAsync(new Date(), key);
      return Reflect.apply(value, target, arguments);
    };
  }
});

// executes apply trap in the background
apiProxy.getUsers();

function logMethodAsync(timestamp, method) {
  setTimeout(function() {
    console.log(${timestamp} - Logging ${method} request asynchronously.);
  }, 0)
}
{% endhighlight %}

This is cool because you can log all sorts of stuff without mucking up your application code or blocking execution. It wouldn’t take much more code to keep track of the performance of certain methods over time.

### 4. Giving warnings or preventing certain operations
Say you want to prevent anyone from ever deleting the property noDelete, you want to let users calling oldMethod know that it has been deprecated, and you want to prevent anyone from ever changing the doNotChange property. Here's a quick implementation.

{% highlight javascript %}

const dataStore = {
  noDelete: 1235,
  oldMethod: function() {/*...*/ },
  doNotChange: "tried and true"
};

const NODELETE = ['noDelete'];
const DEPRECATED = ['oldMethod'];
const NOCHANGE = ['doNotChange'];

const dataStoreProxy = new Proxy(dataStore, {
  set(target, key, value, proxy) {
    if (NOCHANGE.includes(key)) {
      throw Error(Error! ${key} is immutable.);
    }
    return Reflect.set(target, key, value, proxy);
  },
  deleteProperty(target, key) {
    if (NODELETE.includes(key)) {
      throw Error(Error! ${key} cannot be deleted.);
    }
    return Reflect.deleteProperty(target, key);

  },
  get(target, key, proxy) {
    if (DEPRECATED.includes(key)) {
      console.warn(Warning! ${key} is deprecated.);
    }
    var val = target[key];

    return typeof val === 'function' ?
      function(...args) {
        Reflect.apply(target[key], target, args);
      } :
      val;
  }
});

// these will throw errors or log warnings, respectively
dataStoreProxy.doNotChange = "foo";
delete dataStoreProxy.noDelete;
dataStoreProxy.oldMethod();

{% endhighlight %}

### 5. Preventing unnecessary resource-heavy operations
Say you have a server endpoint that returns a very large file. You don’t want requests being made to it while prior requests are enroute, while the file is being downloaded, or once it has already been downloaded. Proxies are a nice construct for moderating this kind of access and retrieving cached values when possible, rather than making calls to the endpoint as often as a user attempts to. I’m going to skip writing most of the code that would entail here. But there’s enough below to give you a feel of how it might work.

{% highlight javascript %}

const obj = {
  getGiantFile: function(fileId) {/*...*/ }
};

const objProxy = new Proxy(obj, {
  get(target, key, proxy) {
    return function(...args) {
      const id = args[0];
      const isEnroute = checkEnroute(id);
      const isDownloading = checkStatus(id);
      const cached = getCached(id);

      if (isEnroute || isDownloading) {
        return false;
      }
      if (cached) {
        return cached;
      }
      return Reflect.apply(target[key], target, args);
    }
  }
});

{% endhighlight %}

### 6. Instantly revoking access to sensitive data
Proxies support revoking access to the target object at any time. This may be useful in cases where you want to completely seal off access (e.g. for security, auth, or performance reasons) to some data or API. Here’s a basic example, using the revocable method. Note that when you're using it, you don't call the new keyword on Proxy.

{% highlight javascript %}

const sensitiveData = {
  username: 'devbryce'
};

const {sensitiveData, revokeAccess} = Proxy.revocable(sensitiveData, handler);

function handleSuspectedHack(){
  // Don't panic
  // Breathe
  revokeAccess();
}

// logs 'devbryce'
console.log(sensitiveData.username);

handleSuspectedHack();

// TypeError: Revoked
console.log(sensitiveData.username);

{% endhighlight %}

Well, that’s all I’ve got. I’d love to hear what ideas you have for using proxies in your work.

Happy JavaScripting, and please let me know if you see something I need to fix in this post!

I relied heavily on the [ES6 spec](http://www.ecma-international.org/ecma-262/6.0/), [Nickolas Zakas’ book on ES6](https://leanpub.com/understandinges6), [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), and [Axel Rauschmayer’s book on ES6](http://exploringjs.com/es6/ch_proxies.html) to learn about proxies. Thanks to all those who contributed to the creation of those resources.

