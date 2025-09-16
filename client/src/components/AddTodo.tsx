import React, { useState } from 'react';

interface AddTodoProps {
  onAdd: (text: string) => Promise<void>;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onAdd(text.trim());
        setText('');
      } catch (error) {
        console.error('Error adding todo:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="새로운 할 일을 입력하세요..."
        className="add-todo-input"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        className="add-todo-btn"
        disabled={!text.trim() || isSubmitting}
      >
        {isSubmitting ? '추가 중...' : '추가'}
      </button>
    </form>
  );
};

export default AddTodo;