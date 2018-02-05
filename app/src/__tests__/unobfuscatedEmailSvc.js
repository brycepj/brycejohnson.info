import unobfuscateEmailAddress from "../unobfuscatedEmailSvc";

describe("unobfuscateEmailAddress", () => {
  it("returns the aliased email address", () => {
    expect(unobfuscateEmailAddress()).toBe("10be8b47@opayq.com");
  });
});
