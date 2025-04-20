import { useState } from 'react';

export default function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex gap-3 items-center bg-white shadow-lg p-3 rounded-xl">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 text-gray-800 placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md font-medium"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}