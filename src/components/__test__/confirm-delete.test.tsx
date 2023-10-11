import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";
import ConfirmDelete from "../confirm-delete.component";
import "@testing-library/jest-dom";
test("render resource name ", () => {
  const resourceName = "React Testing Library";
  render(
    <ConfirmDelete
      onClose={() => {}}
      disabled={false}
      onConfirm={() => {}}
      resourceName={resourceName}
    />
  );

  const headingEl = screen.getByText(
    new RegExp(`${resourceName} permanently`, "i")
  );
  const btnDeletel = screen.getByText(
    new RegExp(`Delete ${resourceName}`, "i")
  );
  expect(headingEl).toBeInTheDocument();
  expect(btnDeletel).toBeInTheDocument();
});
test("onConfirm called when click confirm btn", async () => {
  const user = userEvent.setup();
  const resourceName = "React Testing Library";
  const confirm = vi.fn();
  render(
    <ConfirmDelete
      onClose={() => {}}
      disabled={false}
      onConfirm={confirm}
      resourceName={resourceName}
    />
  );
  const btnConfirm = screen.getByRole("button", { name: /delete/i });
  await user.click(btnConfirm);
  expect(confirm).toBeCalled();
});
test("onClose called when click close btn", async () => {
  const user = userEvent.setup();
  const resourceName = "React Testing Library";
  const close = vi.fn();
  render(
    <ConfirmDelete
      onClose={close}
      disabled={false}
      onConfirm={() => {}}
      resourceName={resourceName}
    />
  );
  const btnClose = screen.getByRole("button", { name: /Cancel/i });
  await user.click(btnClose);
  expect(close).toBeCalled();
});
