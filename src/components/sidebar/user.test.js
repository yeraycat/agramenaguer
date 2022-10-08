import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import User from "./user";
import { BrowserRouter } from "react-router-dom";

function renderInRouter(component) {
  return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe("User component", () => {
  it("should render a skeleton if no username is provided", () => {
    renderInRouter(<User />);
    expect(screen.getByTestId("avatar-skeleton")).toBeVisible();
    expect(screen.getByTestId("username-skeleton")).toBeVisible();
    expect(screen.getByTestId("fullname-skeleton")).toBeVisible();
  });

  it("should render username if username and fullname are provided", () => {
    renderInRouter(<User username="test" fullName="Test Full Name" />);
    expect(screen.getByText("test")).toBeVisible();
  });

  it("should render full name if username and fullname are provided", () => {
    renderInRouter(<User username="test" fullName="Test Full Name" />);
    expect(screen.getByText("Test Full Name")).toBeVisible();
  });

  it("should render avatar if username, fullname and imageUrl are provided", () => {
    renderInRouter(
      <User username="test" fullName="Test Full Name" imageUrl="testimage" />
    );
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeVisible();
    expect(imgElement).toHaveAttribute("src", "testimage");
  });

  it("should render avatar fallback if username, fullname are provided but NOT imageUrl", () => {
    renderInRouter(<User username="test" fullName="Test Full Name" />);
    const fallback = screen.getByTestId("avatar-fallback");
    expect(fallback).toBeVisible();
    expect(fallback).toHaveTextContent("T");
  });
});
