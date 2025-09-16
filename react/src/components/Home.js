import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h1 className="page-title">All Posts</h1>
      <div className="post-list">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <Link to={`/posts/${post.id}`} className="post-title">
              {post.title}
            </Link>
            <p className="post-excerpt">{post.content.slice(0, 80)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
