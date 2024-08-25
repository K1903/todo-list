import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetch('/api/todos/')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = () => {
    fetch('/api/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: newTodo }),
    })
      .then(response => response.json())
      .then(data => setTodos([...todos, data]));
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}/`, {
      method: 'DELETE',
    }).then(() => setTodos(todos.filter(todo => todo.id !== id)));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <div>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
