import React, { useState } from 'react';

export const AddTodo = (props) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title || !desc) {
      alert("Title or Description cannot be blank");
      return;
    }
    props.addTodo(title, desc);
    setTitle("");
    setDesc("");
  };

  return (
    <div className='container my-4 p-4 shadow rounded bg-light'>
      <h3 className='text-center mb-4'>➕ Add a New Todo</h3>
      <form onSubmit={submit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Todo Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title">Todo Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="desc"
            placeholder="Todo Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <label htmlFor="desc">Todo Description</label>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success btn-lg">
            ✅ Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
