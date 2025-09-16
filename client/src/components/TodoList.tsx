import React, { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, completed: false }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const updateTodo = async (id: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map(todo =>
        todo._id === id ? updatedTodo : todo
      ));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="todo-list">
      <h1>할 일 목록</h1>
      <AddTodo onAdd={addTodo} />
      <div className="todos">
        {todos.length === 0 ? (
          <p className="no-todos">할 일이 없습니다.</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;