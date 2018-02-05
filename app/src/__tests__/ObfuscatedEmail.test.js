import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";

import ObfuscatedEmail, { EmailText } from "../ObfuscatedEmail";

describe("ObfuscatedEmail", () => {
  it("renders correctly", () => {
    const result = shallow(<ObfuscatedEmail />);
    expect(result).toMatchSnapshot();
  });

  it("isObfuscated is true on load", () => {
    const result = shallow(<ObfuscatedEmail />);
    const instance = result.instance();
    expect(instance.state.isObfuscated).toBe(true);
  });

  it("reveals email address on click", () => {
    const result = shallow(<ObfuscatedEmail />);
    const emailText = result.find(EmailText);
    const instance = result.instance();

    emailText.simulate("click");

    expect(instance.state.emailAddress).toBe("10be8b47@opayq.com");
    expect(instance.state.isObfuscated).toBe(false);

    const updated = result.update();

    expect(
      updated
        .find(EmailText)
        .children()
        .text()
    ).toBe("10be8b47@opayq.com");
  });

  it("styles text like a button on load", () => {
    const result = shallow(<ObfuscatedEmail />);
    const emailText = result.find(EmailText);
    expect(emailText).not.toHaveStyleRule("font-weight");
    expect(emailText).toHaveStyleRule("background", "gray");
    expect(emailText).toHaveStyleRule("color", "white");
    expect(emailText).toHaveStyleRule("padding", "0 6px");
  });

  it("removes button styles on click", () => {
    const result = shallow(<ObfuscatedEmail />);
    const emailText = result.find(EmailText);

    emailText.simulate("click");

    result.update();

    const updateEmailText = result.find(EmailText);
    expect(updateEmailText).toHaveStyleRule("font-weight", "bold");
    expect(updateEmailText).not.toHaveStyleRule("background");
  });
});
