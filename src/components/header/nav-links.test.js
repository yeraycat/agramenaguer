import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter } from "react-router-dom";
import {
  activeUserProfileNavLinkClass,
  CreatePostNavLink,
  HomeNavLink,
  UserProfileNavLink,
} from "./nav-links";
import * as ROUTES from "../../constants/routes";

function renderInRouter(component) {
  return render(<BrowserRouter>{component}</BrowserRouter>);
}

describe("HomeNavLink component", () => {
  it("should render a link pointing to home", () => {
    renderInRouter(<HomeNavLink />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeVisible();
    expect(linkElement).toHaveAttribute("href", ROUTES.DASHBOARD);
  });

  it("should render a non-active icon if current path is not home", () => {
    renderInRouter(<HomeNavLink currentPath="/testPath" />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", "none");
  });

  it("should render an active icon if current path is home", () => {
    renderInRouter(<HomeNavLink currentPath={ROUTES.DASHBOARD} />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", "currentColor");
  });
});

describe("CreateNavLink component", () => {
  it("should render a link pointing to create post", () => {
    renderInRouter(<CreatePostNavLink />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeVisible();
    expect(linkElement).toHaveAttribute("href", ROUTES.CREATE_POST);
  });

  it("should render a non-active icon if current path is not create post", () => {
    renderInRouter(<CreatePostNavLink currentPath="/testPath" />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", "none");
  });

  it("should render an active icon if current path is create post", () => {
    renderInRouter(<CreatePostNavLink currentPath={ROUTES.CREATE_POST} />);
    const svgElement = screen.getByRole("img");
    expect(svgElement).toHaveAttribute("fill", "currentColor");
  });
});

describe("UserProfileNavLink component", () => {
  it("should render a link pointing to the user profile", () => {
    renderInRouter(<UserProfileNavLink username="test" />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeVisible();
    expect(linkElement).toHaveAttribute("href", `${ROUTES.PROFILE}/test`);
  });

  it("should render a non-active icon if current path is not create post", () => {
    renderInRouter(
      <UserProfileNavLink
        currentPath="/testPath"
        username="test"
        imageUrl="/testImageUrl"
      />
    );
    const imgElement = screen.getByRole("img");
    expect(imgElement).not.toHaveClass(activeUserProfileNavLinkClass);
  });

  it("should render an active icon if current path is create post", () => {
    renderInRouter(
      <UserProfileNavLink
        currentPath={`${ROUTES.PROFILE}/test`}
        username="test"
        imageUrl="/testImageUrl"
      />
    );
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveClass(activeUserProfileNavLinkClass);
  });

  it("should render a non-active fallback icon if current path IS NOT user profile and no imageUrl is passed", () => {
    renderInRouter(
      <UserProfileNavLink
        currentPath={`${ROUTES.PROFILE}/anotheruser`}
        username="test"
      />
    );
    const fallbackElement = screen.getByTestId("avatar-fallback");
    expect(fallbackElement).not.toHaveClass(activeUserProfileNavLinkClass);
  });

  it("should render an active icon if current path IS user profile and no imageUrl is passed", () => {
    renderInRouter(
      <UserProfileNavLink
        currentPath={`${ROUTES.PROFILE}/test`}
        username="test"
      />
    );
    const fallbackElement = screen.getByTestId("avatar-fallback");
    expect(fallbackElement).toHaveClass(activeUserProfileNavLinkClass);
  });
});
