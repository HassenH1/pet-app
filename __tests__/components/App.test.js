import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";

import App from "../../App";

describe("<App/>", () => {
  it("App renders without crashing", () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it("display the image", () => {
    const { getByDataTestId, getByTestId } = render(<App />);
    expect(getByTestId("img")).toHaveAttribute(
      "source",
      "https://www.pngkit.com/png/full/625-6257944_cute-animal-dogsticker-doglove-freetoedit-transparent-dog-kawaii.png"
    );
  });
});
