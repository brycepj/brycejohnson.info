const React = require("react");
const ReactDOM = require("react-dom");

const ImageList = require("./ImageList.js");
const ObfuscatedEmail = require("./ObfuscatedEmail.js");

const css = require("./Home.css");

class Home extends React.Component {
  render() {
    return (
      <div className="page-wrap">
        <h2>
          Hello, my name is Bryce. I'm the husband of Rachael and dad of Emma.
        </h2>

        <ImageList />

        <h3>
          We live on a farm in Virginia with our cats, Ruby and
          Steve.
        </h3>

        <h4>
          I work remotely as a senior frontend engineer at{" "}
          <a href="https://www.hirevue.com/">HireVue</a>, and worked previously
          at <a href="https://about.gitlab.com/">GitLab</a> and at two other
          startups.
        </h4>

        <h4>
          In my spare time, I like to make things with code, help with open
          source projects and write about programming. I also enjoy gardening,
          vermiculture (google it!), working on my car, cooking, and listening
          to music.
        </h4>

        <p>
	 Feel free to reach out to me through email, at <ObfuscatedEmail />
        </p>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.getElementById("home-root"));
