import React from "react";
import { shallow } from "enzyme";
import ImageList from "../ImageList";

describe("ImageList", () => {
  it("renders properly", () => {
    const result = shallow(<ImageList />);
    expect(result).toMatchSnapshot();
  });
});
