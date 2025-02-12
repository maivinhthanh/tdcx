import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchFilter from "../SearchFilter";
import { vi } from "vitest";

describe("SearchFilter Component", () => {
  test("renders input field with correct placeholder", () => {
    render(<SearchFilter searchTerm="" setSearchTerm={vi.fn()} />);
    
    const inputElement = screen.getByPlaceholderText("Search todos...");
    expect(inputElement).toBeInTheDocument();
  });

  test("updates input value when typing", () => {
    render(<SearchFilter searchTerm="" setSearchTerm={vi.fn()} />);
    
    const inputElement = screen.getByPlaceholderText("Search todos...");
    fireEvent.change(inputElement, { target: { value: "New Task" } });
    
    expect(inputElement).toHaveValue("New Task");
  });

  test("calls setSearchTerm after debounce delay", async () => {
    const setSearchTermMock = vi.fn();
    render(<SearchFilter searchTerm="" setSearchTerm={setSearchTermMock} />);
    
    const inputElement = screen.getByPlaceholderText("Search todos...");
    fireEvent.change(inputElement, { target: { value: "Debounced Search" } });

    await waitFor(() => expect(setSearchTermMock).toHaveBeenCalledWith("Debounced Search"), { timeout: 500 });
  });
});
