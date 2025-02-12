import { useState, useEffect } from "react";
import AddTodo from "../components/Todo/AddTodo";
import TodoList from "../components/Todo/TodoList";
import SearchFilter from "../components/Todo/SearchFilter";

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description?: string) => {
    if (!title.trim()) return;
    setTodos([...todos, { id: Date.now(), title, description, completed: false }]);
  };

  const updateTodo = (id: number, updatedTodo: Partial<Todo>) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <hr className="mb-4"/>
      <AddTodo addTodo={addTodo} />
      <TodoList todos={todos} searchTerm={searchTerm} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
}
