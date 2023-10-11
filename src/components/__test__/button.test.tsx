import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "../button";
test("it should render color primary when variation set to primary", () => {
  render(<Button variation="primary">test</Button>);
  const btnEl = screen.getByRole("button", { name: /test/i });
  expect(btnEl).toHaveClass(
    "bg-[var(--color-primary)] text-[var(--color-grey-0)]"
  );
});
test("it should render color danger when variation set to danger", () => {
  render(<Button variation="danger">test</Button>);
  const btnEl = screen.getByRole("button", { name: /test/i });
  expect(btnEl).toHaveClass(
    "bg-[var(--color-danger)] text-[var(--color-grey-0)]"
  );
});
