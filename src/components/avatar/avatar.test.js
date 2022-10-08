import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./avatar";

describe("avatar component", () => {
  it("should render an image if the url of the image is passed to it", () => {
    render(<Avatar imageUrl="lalala" username="test" />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeTruthy();
  });

  it("should render a fallback when only username is passed as prop", () => {
    render(<Avatar username="test" />);
    expect(screen.getByText("T")).toBeTruthy();
  });
});
