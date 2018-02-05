import React, { Component } from "react";

import styled from "styled-components";

import ImageList from "./ImageList";
import ObfuscatedEmail from "./ObfuscatedEmail";

const PageWrap = styled.div``;

const InvitationToContact = styled.p`
  line-height: 25px;
`;

const SeeMoreWrap = styled.div`
  text-align: left;
`;
const SeeLessWrap = styled.div`
  text-align: left;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      showMorePictures: false
    };
  }
  showMorePictures = e => {
    e.preventDefault();
    this.setState({ showMorePictures: true });
  };
  showFewerPictures = e => {
    e.preventDefault();
    this.setState({ showMorePictures: false });
  };
  render() {
    return (
      <PageWrap>
        <h2>
          Hello, my name is Bryce. I'm the husband of Rachael and dad of Emma.
        </h2>

        <ImageList showMorePictures={this.state.showMorePictures} />
        {!this.state.showMorePictures ? (
          <SeeMoreWrap onClick={this.showMorePictures}>
            <a href="">See a few more...</a>
          </SeeMoreWrap>
        ) : (
          <SeeLessWrap>
            <a href="" onClick={this.showFewerPictures}>
              See a few less...
            </a>
          </SeeLessWrap>
        )}

        <h3>We live on a farm in Virginia with our cats, Ruby and Steve.</h3>

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

        <InvitationToContact>
          Feel free to reach out to me through email, at <ObfuscatedEmail />
        </InvitationToContact>
      </PageWrap>
    );
  }
}

export default App;
