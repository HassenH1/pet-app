import React from "react";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react-native";

import App from "../../App";
import { Button } from "react-native-elements";

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

  it("Button before firing", async () => {
    const { getByTestId } = render(
      <Button onPress={() => console.log("Button test")} />
    );
    const btn = await getByTestId("loginBtn");

    // fireEvent.press(getByTestId("loginBtn"));
    // expect(mockFunc).toHaveBeenCalledWidth();
  });
});

//TODOtesting for image
// it("display the image", () => {
//   const { getByTestId } = render(<App />);
//   expect(getByTestId("img")).toHaveAttribute("source", ""); //.toHaveTextContent("")
// });
