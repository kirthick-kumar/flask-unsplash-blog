import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(() => navigate("/"));
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h1 className="page-title">Create Post</h1>
      <input
        className="form-input"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="form-textarea"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button className="btn btn-primary">Create</button>
    </form>
  );
}
