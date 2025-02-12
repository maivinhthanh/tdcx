import { useState } from "react";

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  searchTerm: string;
  updateTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
}

export default function TodoList({ todos, searchTerm, updateTodo, deleteTodo }: TodoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  const saveEdit = (id: number) => {
    updateTodo(id, { title: editTitle, description: editDescription });
    setEditingId(null);
  };

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id} className="flex justify-between items-center p-2 border-b">
          <div className="flex flex-row">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo.id, { completed: !todo.completed })}
              className="mr-2 w-5 h-5 accent-blue-500"
            />
            {editingId === todo.id ? (
              <div className="flex flex-col">
                <input
                  className="border px-2 py-1"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  className="border px-2 py-1 mt-1"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>
            ) : (
              <div>
                <span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
                {todo.description && <p className="text-sm text-gray-500">{todo.description}</p>}
              </div>
            )}
          </div>
          <div>
            {editingId === todo.id ? (
              <button
                className="text-sm text-green-500"
                onClick={() => saveEdit(todo.id)}
              >
                Save
              </button>
            ) : (
              <>
                <button
                  className="text-sm text-yellow-500 mr-2"
                  onClick={() => handleEdit(todo)}
                >
                  Edit
                </button>
                <button className="text-sm text-red-500" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
