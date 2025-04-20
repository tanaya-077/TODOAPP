import { useState } from 'react';
import { FaTrash, FaCheck, FaEdit, FaTimes } from 'react-icons/fa';

export default function TodoItem({ todo, updateTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    if (isEditing) {
      updateTodo({ ...todo, title: editedTitle });
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div 
      className={`flex items-center justify-between p-4 rounded-xl mb-3 shadow-md transition-all duration-300 hover:shadow-lg ${
        todo.completed 
          ? 'bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-400' 
          : 'bg-white border-l-4 border-indigo-400'
      }`}
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => updateTodo({ ...todo, completed: !todo.completed })}
          className={`p-3 rounded-full transition-all duration-300 ${
            todo.completed 
              ? 'bg-green-200 text-green-600 hover:bg-green-300' 
              : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
          }`}
          title={todo.completed ? "Mark as not done" : "Mark as done"}
        >
          <FaCheck className={`${todo.completed ? 'transform scale-110' : ''}`} />
        </button>
        
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            autoFocus
          />
        ) : (
          <span className={`flex-1 text-lg ${
            todo.completed 
              ? 'line-through text-gray-500' 
              : 'text-gray-800'
          }`}>
            {todo.title}
          </span>
        )}
      </div>
      
      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={handleCancel}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-300"
            title="Cancel"
          >
            <FaTimes />
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="p-2 text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors duration-300"
            title="Edit"
          >
            <FaEdit />
          </button>
        )}
        
        <button
          onClick={() => deleteTodo(todo._id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300"
          title="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}