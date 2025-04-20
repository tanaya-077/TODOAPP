import { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const API_URL = 'https://todoapp-backend-zeta.vercel.app//api/todos';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setTodos(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setLoading(false);
    }
  };

  const addTodo = async (title) => {
    try {
      const { data } = await axios.post(API_URL, { title });
      setTodos([data, ...todos]);
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  const updateTodo = async (updatedTodo) => {
    try {
      await axios.patch(`${API_URL}/${updatedTodo._id}`, updatedTodo);
      setTodos(todos.map(todo => 
        todo._id === updatedTodo._id ? updatedTodo : todo
      ));
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
      <TodoForm addTodo={addTodo} />
      
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-center text-gray-500">No todos yet. Add one above!</p>
      ) : (
        <div className="space-y-2">
          {todos.map(todo => (
            <TodoItem 
              key={todo._id} 
              todo={todo} 
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}