import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import "./styles.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="logo">My Blog</Link>
          <Link to="/create" className="btn btn-primary">+ New Post</Link>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
