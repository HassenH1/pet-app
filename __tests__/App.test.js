import React from "react";
import renderer from "react-test-renderer";

import App from "../App";

describe("<App/>", () => {
  it("App renders without crashing", () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });
});
