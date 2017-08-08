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

        <p>The best way to reach me is through email, at
          <ObfuscatedEmail/>
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Home/>, document.getElementById('home-root'));
