import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";

import App from "../../App";
import Login from "../../src/components/login";

describe("<App/>", () => {
  it("App renders without crashing", () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it("has 1 child", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });

  it("should render text", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("heading")).not.toBeNull();
  });

  it("Button before firing", () => {
    const mockFunc = jest.fn();
    const { getByTestId } = render(<App />);
    fireEvent.press(getByTestId("loginBtn"));
    expect(mockFunc).toHaveBeenCalled();
  });
});

//TODOtesting for image
// it("display the image", () => {
//   const { getByTestId } = render(<App />);
//   expect(getByTestId("img")).toHaveAttribute("source", ""); //.toHaveTextContent("")
// });
