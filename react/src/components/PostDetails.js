import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/posts/${id}`, { method: "DELETE" })
      .then(() => navigate("/"));
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-details">
      <h1 className="page-title">{post.title}</h1>
      {post.image_url && (
        <img src={post.image_url} alt={post.title} className="post-image" />
      )}
      <p className="post-content">{post.content}</p>
      <div className="button-group">
        <Link to={`/edit/${post.id}`} className="btn btn-warning">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}
