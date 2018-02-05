import React from "react";
import styled from "styled-components";
import unobfuscateEmailAddress from "./unobfuscatedEmailSvc";

export const EmailText = styled.span`
  display: inline-block;
  margin-left: 4px;
  ${p => (!p.isBlurred ? "font-weight: bold" : null)};
  ${p =>
    p.isBlurred
      ? `
    background: gray;
      color: white;
      padding: 0 6px;
      border-radius: 3px;
      cursor: pointer;
      opacity: .6;
  `
      : null};
`;

class ObfuscatedEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isObfuscated: true
    };
  }

  revealAddress() {
    this.setState({
      isObfuscated: false,
      emailAddress: unobfuscateEmailAddress()
    });
  }

  render() {
    const { emailAddress } = this.state;
    return (
      <EmailText
        isBlurred={!emailAddress}
        onClick={this.revealAddress.bind(this)}
      >
        {emailAddress || "reveal"}
      </EmailText>
    );
  }
}

export default ObfuscatedEmail;
