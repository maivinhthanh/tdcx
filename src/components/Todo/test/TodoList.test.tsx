import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../TodoList";
import { vi } from "vitest";

const mockTodos = [
  { id: 1, title: "Learn React", description: "Understand basics", completed: false },
  { id: 2, title: "Learn Testing", description: "Write unit tests", completed: false },
];

const mockUpdateTodo = vi.fn();
const mockDeleteTodo = vi.fn();

describe("TodoList Component", () => {
  test("renders the list of todos", () => {
    render(
      <TodoList todos={mockTodos} searchTerm="" updateTodo={mockUpdateTodo} deleteTodo={mockDeleteTodo} />
    );

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Learn Testing")).toBeInTheDocument();
  });

  test("filters todos based on search term", () => {
    render(
      <TodoList todos={mockTodos} searchTerm="React" updateTodo={mockUpdateTodo} deleteTodo={mockDeleteTodo} />
    );

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.queryByText("Learn Testing")).not.toBeInTheDocument(); // Should be filtered out
  });

  test("marks a todo as completed", () => {
    render(
      <TodoList todos={mockTodos} searchTerm="" updateTodo={mockUpdateTodo} deleteTodo={mockDeleteTodo} />
    );

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    expect(mockUpdateTodo).toHaveBeenCalledWith(1, { completed: true });
  });

  test("allows editing a todo", () => {
    render(
      <TodoList todos={mockTodos} searchTerm="" updateTodo={mockUpdateTodo} deleteTodo={mockDeleteTodo} />
    );

    const editButton = screen.getAllByText("Edit")[0];
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Learn React");
    fireEvent.change(input, { target: { value: "Learn Advanced React" } });

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(mockUpdateTodo).toHaveBeenCalledWith(1, { title: "Learn Advanced React", description: "Understand basics" });
  });

  test("deletes a todo", () => {
    render(
      <TodoList todos={mockTodos} searchTerm="" updateTodo={mockUpdateTodo} deleteTodo={mockDeleteTodo} />
    );

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    expect(mockDeleteTodo).toHaveBeenCalledWith(1);
  });
});
