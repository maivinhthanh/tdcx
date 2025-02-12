import { render, screen, fireEvent } from "@testing-library/react";
import AddTodo from "../AddTodo";
import { vi } from "vitest";

describe("AddTodo Component", () => {
  test("renders input fields and button", () => {
    render(<AddTodo addTodo={vi.fn()} />);

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description (optional)")).toBeInTheDocument();
    expect(screen.getByText("Add Todo")).toBeInTheDocument();
  });

  test("does not call addTodo if title is empty", () => {
    const addTodoMock = vi.fn();
    render(<AddTodo addTodo={addTodoMock} />);

    fireEvent.click(screen.getByText("Add Todo"));

    expect(addTodoMock).not.toHaveBeenCalled();
  });

  test("calls addTodo with title and optional description", () => {
    const addTodoMock = vi.fn();
    render(<AddTodo addTodo={addTodoMock} />);

    // Fill inputs
    fireEvent.change(screen.getByPlaceholderText("Title"), { target: { value: "Buy Milk" } });
    fireEvent.change(screen.getByPlaceholderText("Description (optional)"), { target: { value: "2 liters" } });

    // Click add button
    fireEvent.click(screen.getByText("Add Todo"));

    // Expect function call with correct values
    expect(addTodoMock).toHaveBeenCalledWith("Buy Milk", "2 liters");
  });

  test("clears input fields after adding a todo", () => {
    const addTodoMock = vi.fn();
    render(<AddTodo addTodo={addTodoMock} />);

    const titleInput = screen.getByPlaceholderText("Title") as HTMLInputElement;
    const descInput = screen.getByPlaceholderText("Description (optional)") as HTMLInputElement;

    // Fill inputs
    fireEvent.change(titleInput, { target: { value: "Go to Gym" } });
    fireEvent.change(descInput, { target: { value: "Morning workout" } });

    // Click add button
    fireEvent.click(screen.getByText("Add Todo"));

    // Expect inputs to be cleared
    expect(titleInput.value).toBe("");
    expect(descInput.value).toBe("");
  });
});
