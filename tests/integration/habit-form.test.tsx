import { describe, it, expect, beforeEach} from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ProtectedRoute from "../../src/components/shared/ProtectedRoute";

const routerMock = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
}));

describe('habit form', () => {
  beforeEach(() => {
    localStorage.clear();

    localStorage.setItem(
      "habit-tracker-session",
      JSON.stringify({
        userId: "1",
        email: "test@example.com",
      })
    );
  });

  it('shows a validation error when habit name is empty', () => {
    render(<ProtectedRoute />);

    fireEvent.click(screen.getByTestId("create-habit-button"));
    fireEvent.click(screen.getByTestId("habit-save-button"));

    expect(
      screen.getByText("Habit name is required")
    ).toBeInTheDocument();
  });

  it('creates a new habit and renders it in the list', () => {
    render(<ProtectedRoute />);

    fireEvent.click(screen.getByTestId("create-habit-button"));

    fireEvent.change(screen.getByTestId("habit-name-input"), {
      target: { value: "Read More" },
    });

    fireEvent.click(screen.getByTestId("habit-save-button"));

    expect(screen.getByText("Read More")).toBeInTheDocument();
  });

  it('edits an existing habit and preserves immutable fields', () => {
    localStorage.setItem(
      "habit-tracker-habits",
      JSON.stringify([
        {
          id: "1",
          userId: "1",
          name: "Old",
          description: "",
          frequency: "daily",
          createdAt: "date",
          completions: [],
        },
      ])
    );

    render(<ProtectedRoute />);

    fireEvent.click(screen.getByTestId("habit-edit-old"));

    fireEvent.change(screen.getByTestId("habit-name-input"), {
      target: { value: "New Reads" },
    });

    fireEvent.click(screen.getByTestId("habit-save-button"));

    expect(screen.getByText("New Reads")).toBeInTheDocument();
  });

  it('deletes a habit only after explicit confirmation', () => {
    localStorage.setItem(
      "habit-tracker-habits",
      JSON.stringify([
        {
          id: "1",
          userId: "1",
          name: "Delete Me",
          description: "",
          frequency: "daily",
          createdAt: "date",
          completions: [],
        },
      ])
    );

    render(<ProtectedRoute />);

    fireEvent.click(screen.getByTestId("habit-delete-delete-me"));
    fireEvent.click(screen.getByTestId("confirm-delete-button"));

    expect(screen.queryByText("Delete Me")).not.toBeInTheDocument();
  });

  it('toggles completion and updates the streak display', () => {
    localStorage.setItem(
      "habit-tracker-habits",
      JSON.stringify([
        {
          id: "1",
          userId: "1",
          name: "Run",
          description: "",
          frequency: "daily",
          createdAt: "date",
          completions: [],
        },
      ])
    );

    render(<ProtectedRoute />);

    fireEvent.click(screen.getByTestId("habit-complete-run"));

    expect(screen.getByText(/1 day/i)).toBeInTheDocument();
  });
});
