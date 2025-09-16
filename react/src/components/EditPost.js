import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
      });
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:5000/posts/${id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ title, content })
    })
      .then(res => res.json())
      .then(() => navigate(`/posts/${id}`));
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h1 className="page-title">Edit Post</h1>
      <input
        className="form-input"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="form-textarea"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button className="btn btn-primary">Save Changes</button>
    </form>
  );
}
