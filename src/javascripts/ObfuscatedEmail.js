const React = require('react');
const unobfuscateEmailAddress = require('./unobfuscatedEmailSvc.js');

module.exports = class ObfuscatedEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isObfuscated: true,
    };
  }

  revealUnobfuscatedAddress() {
    this.setState({
      isObfuscated: false,
      emailAddress: unobfuscateEmailAddress()
    });
  }

  renderedText() {
    return this.state.isObfuscated ? 'reveal' : this.state.emailAddress;
  }

  blurTextCss() {
    return this.state.isObfuscated ? 'blur-text' : '';
  }

  render() {
    return (
      <span onClick={ this.revealUnobfuscatedAddress.bind(this) } className={ this.blurTextCss() }>
        { this.renderedText() }
      </span>
    );
  }
}
