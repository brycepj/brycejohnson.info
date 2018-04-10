---
layout: post
title:  Examples of aria-hidden="true" and role="presentation" in the wild
date:   2018-04-03
categories: accessibility
---

I recently ran into a scenario at work where I wasn't sure whether to use `aria-hidden="true"` or `role="presentation"`. They're both
used to hide content from screenreaders, but it wasn't clear to me why I'd use one over the other.

When I turned to the internet for answers, I found some [good articles](#good-resources) about how and why to use these attributes, but nothing I read applied
to my use-case, and I was still hazy about how to distinguish the two. More specifically, everything I read started with specs (TODO: link)
or documentation (TODO: link) and broke them down into more human-readable language, with a few simple code samples.

This post is an attempt to tacking my question in the opposite direction. Instead of trying to parse the spec and see how to apply to my specific use-case,,
I'm asking, how are `aria-hidden="true"` and `role="presentation"` used by engineers who work on popular, accessible web sites and applications, and what
does that tell me about the purpose of these attributes?

[what I did]

Below you'll find screenshots and code samples from sites like Amazon, Facebook, Twitter, (list all).

## What aria-hidden="true" is used for:

### 1. Content that is visually hidden, but still exists in the DOM, like:

It's not uncommon for developers to load hidden content onto the page for quick access later on. Besides icons, this was
by far the most common use of `aria-hidden="true"` I came across.

#### [cdc.gov] Content for hidden panels

  <figure>
    <img alt="" src="{{ "/images/cdc-gov-hidden-tab-panels.png" | absolute_url }}"/>
    <figcaption>When you click a tab, new content in the panel below. aria-hidden is applied to content panels not current shown.</figcaption>
  </figure>

Actual Code (simplified):
 ```html
<ul role="tablist">
  <li role="tab">Leadership, Policy and Communication </li>
  <li role="tab">Program Development & Services</li>
  <li role="tab">Research Application & Evaluation </li>
  <li role="tab">School-Based Surveillance</li>
</ul>
<div id="tab-1" aria-hidden="true">[panel content]</div>
<div id="tab-2" aria-hidden="false">[panel content]</div>
<div id="tab-3" aria-hidden="true">[panel content]</div>
<div id="tab-4" aria-hidden="true">[panel content]</div>
```

[Live](https://www.cdc.gov/healthyyouth/about/index.htm)

#### [canada.ca] Non-expanded Dropdown menus

<figure>
    <img alt="" src="{{ "/images/canada-ca-dropdown-menu.png" | absolute_url }}"/>
    <figcaption>Each navbar link contains a submenu that has aria-hidden applied until it's selected</figcaption>
  </figure>

Actual Code (simplified):
```html
<ul role="menubar">
  <li>
    <a href="/job.html" role="menu-item">Jobs</a>
    <ul id="jobs" class="visually-shown" role="menu" aria-hidden="false">[submenu content]</ul>
  <li>
  <li>
    <a href="/immigration.html" role="menu-item">Immigration</a>
    <ul id="immigration" class="visually-hidden" role="menu" aria-hidden="true">[submenu content]</ul>
  <li>
  <li>
    <a href="/travel.html" role="menu-item">Travel</a>
    <ul id="travel" class="visually-hidden" role="menu" aria-hidden="false">[submenu content]</ul>
  <li>
</ul>
```

[Live](https://www.canada.ca/en/services/benefits/family.html).


#### [facebook.com] Inactive slides on a carousel slider

<figure>
    <img alt="" src="{{ "/images/facebook-image-slider.png" | absolute_url }}"/>
    <figcaption>Images for other contact pages are loaded into the DOM, but hidden until they're navigated to</figcaption>
  </figure>

Actual Code (simplified):
```html
<div class="carousel-list">
  <div role="article" aria-hidden="false">[contact image]</div>
  <div role="article" aria-hidden="false">[contact image]</div>
  <div role="article" aria-hidden="false">[contact image]</div>
  <div role="article" aria-hidden="true">[contact image]</div>
  <div role="article" aria-hidden="true">[contact image]</div>
  <div role="article" aria-hidden="true">[contact image]</div>
  <div role="article" aria-hidden="true">[contact image]</div>
  <div role="article" aria-hidden="true">[contact image]</div>
  <div role="article" aria-hidden="true">[contact image]</div>
</div>
```
#### [amazon.com] The wrapper for an inactive loading spinner

I was too lazy to find a loading state and snap a screenshot, but here's the code, almost verbatim.

```html
<div class="spinner" aria-hidden="true" style="display:none;">
  <img height="100" width="100" src="https://url-for-the-spinner.gif"/>
</div>
```

#### [google.com] Popup menus that are not selected
<figure>
    <img alt="" src="{{ "/images/google-apps-menu.png" | absolute_url }}"/>
    <figcaption>The GSuite apps menu is already loaded into the DOM, but hidden until you click the grid icon</figcaption>
  </figure>

Actual Code (simplified):
```html
<div aria-label="Google apps" aria-hidden="true" role="region">
  <ul>[ app icons ]</ul>
</div>
```

### 2. Content that requires visual cues to understand, and for which you've provided a better alternative for screenreaders, like:

Rather than annotating existing content with cues for screenreaders, I found many examples where more informative text is contained in a nearby element and
hidden visually, and then `aria-hidden="true"` is applied to the text that most users see.

#### [twitter.com] Terse button text

<figure>
    <img alt="A screenshot of the Twitter navigation menu, including the Home button" src="{{ "/images/twitter-home-button.png" | absolute_url }}"/>
    <figcaption>Twitter hides the text "Home", in favor of "Home, current page."</figcaption>
  </figure>

Actual Code (simplified):
```html
<a href="/">
  <span class="Icon Icon--home Icon--large"></span>
  <span class="text" aria-hidden="true">Home</span>
  <span class="u-hiddenVisually a11y-active-page-text">Home, current page.</span>
</a>
```
#### [linkedin.com] Common action buttons that need context https://cl.ly/3u051743262C https://cl.ly/3c033G1Q0U10 https://cl.ly/3k2i290a473m https://cl.ly/432r3h46251m

Would you click a 'Share' button, if you couldn't see what you're sharing? When you're scrolling through your LinkedIn feed, it's easy to tell that "Share", "Like", and "Comment" buttons are associated with the story you're looking at. But because not all users see that, LinkedIn hides the visual text for these common actions (as well as for stats like like and comment totals) for screenreaders, and provides more context in an adjacent element.

<figure>
    <img alt="" src="{{ "/images/linkedin-post-action-buttons.png" | absolute_url }}"/>
    <figcaption></figcaption>
  </figure>

Actual Code (simplified):
```html

<!-- Likes total -->
<button>
  <span aria-hidden="true">4373 likes</span>
  <span class="visually-hidden"> 4373 likes on Arianna Huffington’s post </span>
</button>

<!-- Comment total -->
<button>
  <span aria-hidden="true">100 comments</span>
  <span class="visually-hidden"> 100 comments on Arianna Huffington’s post </span>
</button>

<!-- Like button -->
<button>
  <span class="like-icon svg-icon-wrap"></span>
  <span aria-hidden="true">Like</span>
  <span class="visually-hidden"> Like Arianna Huffington’s post </span>
</button>

<!-- Comment button -->
<button>
  <span class="comment-icon svg-icon-wrap"></span>
  <span aria-hidden="true">Comment</span>
  <span class="visually-hidden"> Comment on Arianna Huffington’s post </span>
</button>

<!-- Share button -->
<button>
  <span class="share-icon svg-icon-wrap"></span>
  <span aria-hidden="true">Share</span>
  <span class="visually-hidden"> Share Arianna Huffington’s post </span>
</button>
```

#### [amazon.com] A countdown timer  https://cl.ly/0B0V0Q1E0m1Y

<figure>
    <img alt="" src="{{ "/images/amazon-timer-countdown.png" | absolute_url }}"/>
    <figcaption>I need a caption</figcaption>
  </figure>

Actual Code (simplified):
```html
<div>
  <div class="gw-clock" aria-hidden="true">Ends in 03:43:45</div>
  <div class="gw-clock-aria" role="timer" aria-hidden="false">
    Ends in 3 hours 43 minutes 45 seconds
  </div>
</div>
```

### 3. Icons, icons, icons

Icons are by far the most common use of `aria-hidden="true"`. They are often contained in interactive elements, and contain code or content that is completely unhelpful
to screenreaders.

#### [visionaustralia.com] Icons loaded from CSS

  <figure>
    <img alt="" src="{{ "/images/vision-australia-icon.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

```html
<div class="phoneNumber">
  <a>
    <span class="icon-phone" aria-hidden="true"></span>
    1300 84 74 66
  </a>
</div>
```

```css
.icon-phone:before {
  content: "\e909";
  color: #00205b;
}
```

#### [linkedin.com] Inline SVG icons

  <figure>
    <img alt="" src="{{ "/images/linkedin-icon.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

```html
<a href="/feed/">
  <span id="feed-tab-icon">
    <li-icon aria-hidden="true">
      <svg> [ lots and lots of unreadable code ] </svg>
    </li-icon>
  </span>
  <span> Home</span>
</a>
```

### 4. Unicode characters used to separate links

In some cases, these had `role="presentation` applied to them too.

#### [twitter.com] dot separating links

  <figure>
    <img alt="" src="{{ "/images/linkedin-bullets.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

```html
<div class="flex-module-header">
  <h3>Trends for you</h3>
  <span class="middot" aria-hidden="true">·</span>
  <a role="button" href="#"> Change </a>
</div>
```
#### [facebook.com] bullet separator between languages in language box on right sidebar
  <figure>
    <img alt="" src="{{ "/images/facebook-language.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

```html
<div>
  <span lang="en_US">English (US)</span>
  <span role="presentation" aria-hidden="true"> · </span>
  <a> Español</a>
  <span role="presentation" aria-hidden="true"> · </span>
  <a>Português (Brasil)</a>
</div>
```

### 5. Advertisements with text in the images

[explanation]

#### [amazon.com] Ad image banner

  <figure>
    <img alt="" src="{{ "/images/amazon-thing.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

  ```html
<div aria-hidden="true" style="background-image: url(https://images-na.ssl-images-amazon.com/images/ad.jpg);">
  <a href="/stream/some-href">Interesting Finds Updated Daily</a>
</div>
```
#### [amazon.com] Images that contain text
  <figure>
    <img alt="" src="{{ "/images/amazon-text-image.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

  ```html
<div aria-hidden="true">
  <span><strong>Tap here</strong> for info</span>
  <span><strong>Tap here</strong> to buy</span>
</div>
```

### 6. Redundant content

[explanation]

#### [facebook.com] link containing post's user image (also has tabindex="-1")
  <figure>
    <img alt="" src="{{ "/images/facebook-user-post.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

```html
<a aria-hidden="true" tabindex="-1">
  <div>
    <img src="long-url-to-user-avatar" role="img"/>
  </div>
</a>
```
#### [twitter.com] clickable zones that are helpful for sighted users, but redundant
  <figure>
    <img alt="" src="{{ "/images/twitter-redudant-click-targets.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

```html
<div class="DashboardProfileCard">
  <a href="/4cf2ad20" tabindex="-1" aria-hidden="true" rel="noopener">
    <!-- Clickable Cover Photo -->
  </a>
  <div>
    <a href="/4cf2ad20" aria-hidden="true" title="Person's Name" tabindex="-1" rel="noopener">
      <img src="https://clickable-cover-photo.jpg"/>
    </a>
    <a href="/4cf2ad20" rel="noopener">Bryce Johnson</a>
  </div>
</div>
```

### 9. Elements you're doing administrative or tricksy non-user-helpful stuff with

[explanation]

#### [ssa.gov] Elements in the DOM generate hooks in the JavaScript on other pages.

  <figure>
    <img alt="" src="{{ "/images/ssa-dom-hooks.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

#### [amazon.com] <iframe> containing a pixel for ad tracking

  <figure>
    <img alt="" src="{{ "/images/amazon-iframe-thing.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
    </figure>

#### [visionaustralia.com] noscript tag that contains code for analytics

  <figure>
    <img alt="" src="{{ "/images/va-noscript-iframe.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>


## Examples of role="presentation"

Harder to find examples. Most of the sites I reviewed had none, the rest had a few.

### 2. Elements that help with layout that don't matter to non-sighted users
[explanation] Why does this matter?

#### [facebook.com] tables user in the People You May Know section. obcsure
  <figure>
    <img alt="" src="{{ "/images/facebook-users-you-know.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
    </figure>

```html
<table class="uiGrid _51mz" cellspacing="0" cellpadding="0" role="presentation">
  <tbody> [Text and Images] </tbody>
</table>
```

#### [amazon.com] footer div that uses display: table https://cl.ly/462B0V3Y0u2p

  <figure>
    <img alt="" src="{{ "/images/amazon-footer-table.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

```css
#navFooter .navAccessibility.navFooterVerticalColumn {
  display: table;
  margin: 0 auto;
}
```
#### [linkedin.com] <aside> elements that serve as sidebars -- https://cl.ly/1a3A0m2d4208 https://cl.ly/441R0x0b2I0h3

  <figure>
    <img alt="" src="{{ "/images/linkedin-asides.png" | absolute_url }}"/>
    <figcaption>[todo]</figcaption>
  </figure>

```html
<aside role="presentation" class="left-rail">
  [ left sidebar panels ]
</aside>

<div> Newsfeed Content </div>

<aside role="presentation" class="right-rail">
  [ right sidebar panels ]
</aside>
```
### 3. Elements used to wrap important, interactive elements
[explanation]
#### [facebook.com] multiple layers of divs used to wrap interactive menus: https://cl.ly/0Y3w0x0g2Y2R
#### [facebook.com] individual tabs (<li>) in a tablist (<ul>) for trending topics, each of which wraps a link (<a>) https://cl.ly/1u3p0D2U2X0A
#### [facebook.com] elements for adding subtle styles to a text input

### 4. Interactive elements that aren't being used as interactive elements
[explanation]
#### [cdc.gov] link elements that are not really being used as links https://cl.ly/3q1W1b0n1H04

### 5. Decorative images
[explanation]
#### [facebook.com] The current user's avatar, which is really just a decorative cue for sighted users

## Putting together the pieces

Some useful insights you might find helpful:

- role="presentation" just isn't used as often
- aria-hidden could change. role="presentation" does not.
- aria-hidden describes a thing, role="presentation" applies to a single element in the DOM
- aria-hidden="true" is for things that would be confusing, harmful to UX, or completely irrelevant to users with a screenreader.
- role="presentation" is for more elements that you've got in the DOM that isn't important to users and will just slow someone down. This is why it doesn't obscure its children from screenreaders -- it's typically trying to get out of your way on the way to the children.

Accessible websites

https://www.cdc.gov/healthyyouth/about/index.htm - AH 3 RP 4
https://twitter.com
https://www.facebook.com/ - AH 101 - RP 77
https://www.linkedin.com/feed/ - AH 69 - RP 2
https://www.google.com/ - AH 12 - RP 1
https://www.amazon.com/ - AH 136 RP 11
https://www.apple.com/ - AH 16 - RP 24

Want to look at how any given website is using these `aria-hidden="true"` and `role="presentation"` attributes? Navigate to that site, open the developer tools console, and paste this in:

```javascript
(() => {
  const usesOfAriaHidden = document.querySelectorAll('[aria-hidden="true"]');
  console.log('Uses of aria-hidden="true"', usesOfAriaHidden);

  const usesOfRolePresentation = document.querySelectorAll('[role="presentation"]');
  console.log('Uses of role="presentation"', usesOfRolePresentation);
})();
```

<div id="good-resources">
## Some good resources
</div>

