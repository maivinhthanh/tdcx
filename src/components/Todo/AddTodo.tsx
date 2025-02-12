import { useState } from "react";

interface AddTodoProps {
  addTodo: (title: string, description?: string) => void;
}

export default function AddTodo({ addTodo }: AddTodoProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodo(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="mb-4">
      <input
        className="border p-2 w-full mb-2 rounded-md"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 w-full rounded-md"
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="mt-2 p-2 bg-blue-500 text-white w-full rounded-md" onClick={handleAdd}>
        Add Todo
      </button>
    </div>
  );
}
