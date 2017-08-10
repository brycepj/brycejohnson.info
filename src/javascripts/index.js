const React = require('react');
const ReactDOM = require('react-dom');

const ImageList = require('./ImageList.js');
const ObfuscatedEmail = require('./ObfuscatedEmail.js');

const css = require('./Home.css');

class Home extends React.Component {
  render() {
    return (
      <div>
        <h2> Hello, my name is Bryce. I'm the husband of Rachael and dad of Emma.</h2>

        <ImageList/>

        <h3> We live on a quiet little farm in Virginia with our cats, Ruby and Steve. </h3>

        <h4> I work as a frontend engineer at <a href='https://about.gitlab.com/'>GitLab</a>. Nearly all of my work happens in the open,
          which you can see <a href='https://gitlab.com/brycepj'>here</a>.</h4>

        <h4>In my spare time, I like to help with open source projects and write about programming.</h4>

        <h5>Articles</h5>
        
        <ul>
          <li>
            <a href="https://medium.com/@_devbryce/6-compelling-use-cases-for-es6-proxies-2a8e2ddd9e3a">
          6 compelling use cases for ES6 proxies </a>
          </li>
          {/* <li>Comparing Event Management in Vue.js and React.js</li> */}
          {/* <li>Walk through the Design of VueX</li> */}
          {/* <li>Speeding Up Frontend Performance on Merge Requests at GitLab</li> */}
        </ul>

        <h5>Projects</h5>
        
        <ul>
          <li> Flexbox in 5 minutes- an interactive tour of the new-ish CSS property: flexbox
            <a href="https://cvan.io/flexboxin5/">Demo</a>
            <a href="https://github.com/brycepj/flexbox">Repo</a>
          </li>
          <li>
            Scrawl: a simple note-taking CLI
            <a href="https://github.com/brycepj/scrawl">Repo</a>
          </li>
        </ul>

        <h5>OSS Projects I've contributed to</h5>

        <ul>
          <li>Angular 2</li>
          <li>Vue.js</li>
          <li>Angular.io</li>
          <li>GitLab CE</li>
        </ul>

        <p>The best way to reach me is through email, at
          <ObfuscatedEmail/>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Home/>, document.getElementById('home-root'));
