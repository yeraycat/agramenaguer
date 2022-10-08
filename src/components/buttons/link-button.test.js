import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { LinkButton } from "./link-button";
import { BrowserRouter } from "react-router-dom";
import { baseClasses } from "./button";

describe("LinkButton Component", () => {
  it("should render a link with button base classes", () => {
    render(
      <BrowserRouter>
        <LinkButton />
      </BrowserRouter>
    );
    expect(screen.getByRole("link")).toHaveClass(baseClasses);
  });

  it("should render children", () => {
    render(
      <BrowserRouter>
        <LinkButton>test</LinkButton>
      </BrowserRouter>
    );
    expect(screen.getByText("test")).toBeTruthy();
  });

  it("should use the passed to as href", () => {
    render(
      <BrowserRouter>
        <LinkButton to="/yep" />
      </BrowserRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/yep");
  });

  it("should render extended styles if passed in className prop", () => {
    render(
      <BrowserRouter>
        <LinkButton className="testClassName" />
      </BrowserRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("testClassName");
  });
});
