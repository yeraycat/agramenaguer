import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  baseClasses,
  Button,
  ButtonPrimary,
  disabledClasses,
  primaryClasses,
} from "./button";

describe("Button Component", () => {
  it("should render a button with button base classes", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toHaveClass(baseClasses);
  });

  it("should render children", () => {
    render(<Button>test</Button>);
    expect(screen.getByText("test")).toBeTruthy();
  });

  it("should run onClick handler when clicked", () => {
    const mockHandler = jest.fn();
    render(<Button onClick={mockHandler} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is passed as true", () => {
    render(<Button disabled={true} />);
    const button = screen.getByRole("button");
    expect(button.attributes.disabled).toBeTruthy();
  });

  it("should render disabled styles when disabled prop is passed", () => {
    render(<Button disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(disabledClasses);
  });

  it("should render extended styles if passed in className prop", () => {
    render(<Button className="testClassName" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("testClassName");
  });
});

describe("Button Primary Component", () => {
  it("should render primary classes", () => {
    render(<ButtonPrimary />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass(primaryClasses);
  });
});
