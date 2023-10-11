import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Avatar from "../avatar";

test("should render an img with src property matches src property user provided", () => {
  const srcImg = "https://test.img.vn";
  render(<Avatar src={srcImg} size="small" />);
  const imgEl = screen.getByRole("img");
  expect(imgEl).toHaveAttribute("src", srcImg);
});
test("should render the default img if no src prop provided", () => {
  const srcImg = "";
  const defaultImgSrc = "/imgs/default-user.jpg";
  render(<Avatar src={srcImg} size="small" />);
  const imgEl = screen.getByRole("img");
  expect(imgEl).toHaveAttribute("src", defaultImgSrc);
});
