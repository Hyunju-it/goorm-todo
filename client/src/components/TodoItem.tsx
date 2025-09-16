import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggleComplete = () => {
    if (todo._id) {
      onUpdate(todo._id, { completed: !todo.completed });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (todo._id && editText.trim()) {
      onUpdate(todo._id, { text: editText.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleDelete = () => {
    if (todo._id && window.confirm('정말 삭제하시겠습니까?')) {
      onDelete(todo._id);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        className="todo-checkbox"
      />

      {isEditing ? (
        <div className="edit-container">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="edit-input"
            autoFocus
          />
          <div className="edit-buttons">
            <button onClick={handleSave} className="save-btn">저장</button>
            <button onClick={handleCancel} className="cancel-btn">취소</button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <span className="todo-text">{todo.text}</span>
          <div className="todo-actions">
            <button onClick={handleEdit} className="edit-btn">수정</button>
            <button onClick={handleDelete} className="delete-btn">삭제</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;