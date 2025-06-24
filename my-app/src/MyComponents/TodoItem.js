import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleRead }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5
          className={`card-title ${todo.read ? 'text-decoration-line-through text-muted' : ''}`}
        >
          {todo.title}
        </h5>
        <p className={`card-text ${todo.read ? 'text-muted' : ''}`}>
          {todo.desc}
        </p>
        <div className="d-flex justify-content-end gap-2">
          <button
            className='btn btn-outline-danger btn-sm'
            onClick={() => onDelete(todo)}
          >
            🗑️ Delete
          </button>
          <button
            className={`btn btn-sm ${todo.read ? 'btn-warning' : 'btn-outline-success'}`}
            onClick={() => onToggleRead(todo)}
          >
            {todo.read ? '📖 Mark as Unread' : '✅ Mark as Read'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
