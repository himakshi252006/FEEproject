
import React, { useState } from "react";

function BlogCard({ blog, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(blog.title);
  const [editContent, setEditContent] = useState(blog.content);

  const saveEdit = () => {
    onEdit({ ...blog, title: editTitle, content: editContent });
    setIsEditing(false);
  };

  return (
    <div className="blog-card">
      {isEditing ? (
        <>
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <div className="blog-btns">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(blog.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");

  const addBlog = () => {
    if (title && content) {
      setBlogs([...blogs, { id: Date.now(), title, content }]);
      setTitle("");
      setContent("");
    }
  };

  const deleteBlog = (id) => setBlogs(blogs.filter((b) => b.id !== id));

  const editBlog = (updatedBlog) =>
    setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)));

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: sans-serif;
        }
        .app {
          padding: 20px;
          background-color: #f5f5f5;
          color: #333;
          min-height: 100vh;
          transition: all 0.3s ease;
        }
        .dark {
          background-color: #1e1e1e;
          color: #f5f5f5;
        }
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .theme-btn {
          padding: 8px 12px;
          cursor: pointer;
          transition: 0.3s;
        }
        .theme-btn:hover { opacity: 0.8; }
        .create-blog input,
        .create-blog textarea,
        .search-input {
          display: block;
          width: 100%;
          margin: 10px 0;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
          transition: all 0.3s;
        }
        .create-blog input:focus,
        .create-blog textarea:focus,
        .search-input:focus {
          outline: none;
          border-color: #007bff;
        }
        .create-blog button {
          padding: 8px 12px;
          cursor: pointer;
          margin-bottom: 10px;
          transition: 0.3s;
        }
        .create-blog button:hover { opacity: 0.8; }
        .blogs { margin-top: 20px; }
        .blog-card {
          background-color: #fff;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          transition: transform 0.3s;
        }
        .dark .blog-card { background-color: #333; }
        .blog-card:hover { transform: translateY(-3px); }
        .blog-btns { margin-top: 10px; }
        .blog-btns button {
          margin-right: 10px;
          cursor: pointer;
          padding: 5px 10px;
          transition: 0.3s;
        }
        .blog-btns button:hover { opacity: 0.8; }
      `}</style>

      <header>
        <h1>EchoHive Blog</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="theme-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <section className="create-blog">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={addBlog}>Add Blog</button>
        <input
          type="text"
          placeholder="Search Blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </section>

      <section className="blogs">
        {filteredBlogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onDelete={deleteBlog}
              onEdit={editBlog}
            />
          ))
        )}
      </section>
    </div>
  );
}
