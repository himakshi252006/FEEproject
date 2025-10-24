import React, { useState } from "react";
import "./FoodPage.css"; // (optional) only if you want to move CSS to external file

const FoodPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [blogs, setBlogs] = useState([
    {
      title: "Delicious Biryani Recipe",
      description: "Learn how to make Hyderabadi biryani with authentic spices.",
      image: "https://images.unsplash.com/photo-1604152135912-04a022e23696"
    },
    {
      title: "Street Food Adventures",
      description: "Explore the famous street food markets of Delhi.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
    },
    {
      title: "Healthy Smoothie Bowls",
      description: "Start your day with refreshing fruit bowls.",
      image: "https://images.unsplash.com/photo-1572441710534-6801ab190219"
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", description: "", image: "" });

  const toggleTheme = () => setIsDark(!isDark);

  const handleAddBlog = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.description || !newBlog.image) return;
    setBlogs([...blogs, newBlog]);
    setNewBlog({ title: "", description: "", image: "" });
    setShowForm(false);
  };

  return (
    <div className={`main ${isDark ? "dark-mode" : ""}`}>
      <header>
        <h1>EchoHive - Food Blogs</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Blogs</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
        <div className="header-buttons">
          <button onClick={() => setShowForm(true)}>+ Add Blog</button>
          <button onClick={toggleTheme}>
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <section className="hero">
        <h2>Explore Tasty Recipes and Food Stories</h2>
        <p>Discover, share, and celebrate your love for food with our curated blogs.</p>
      </section>

      <section className="blog-section">
        <h2>Food Articles</h2>
        <div className="blog-grid">
          {blogs.map((blog, index) => (
            <div key={index} className="blog-card">
              <img src={blog.image} alt={blog.title} />
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Food Blog</h2>
            <form onSubmit={handleAddBlog}>
              <input
                type="text"
                placeholder="Blog Title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={newBlog.description}
                onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newBlog.image}
                onChange={(e) => setNewBlog({ ...newBlog, image: e.target.value })}
              />
              <div className="form-buttons">
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer>
        <p>© 2025 EchoHive. All Rights Reserved.</p>
      </footer>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Poppins", sans-serif;
        }
        body, .main {
          background: #f9f9f9;
          color: #333;
          min-height: 100vh;
        }
        header {
          background: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 3rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        header h1 { color: #ff6347; font-size: 1.5rem; }
        nav ul {
          list-style: none;
          display: flex;
          gap: 1.5rem;
        }
        nav a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: color 0.3s;
        }
        nav a:hover { color: #ff6347; }
        .header-buttons button {
          margin-left: 1rem;
          background: #ff6347;
          color: #fff;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
        }
        .header-buttons button:hover {
          background: #e5533d;
        }
        .hero {
          text-align: center;
          padding: 4rem 2rem;
          background: linear-gradient(135deg, #ffe5d0, #fff5ef);
        }
        .hero h2 { font-size: 2rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.1rem; color: #555; }
        .blog-section {
          padding: 3rem 2rem;
          text-align: center;
        }
        .blog-section h2 {
          margin-bottom: 2rem;
          font-size: 1.8rem;
          color: #444;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          padding: 0 2rem;
        }
        .blog-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          overflow: hidden;
          transition: transform 0.3s;
        }
        .blog-card:hover { transform: translateY(-6px); }
        .blog-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .blog-content {
          padding: 1rem;
          text-align: left;
        }
        .blog-content h3 { color: #ff6347; margin-bottom: 0.5rem; }
        .modal {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: #fff;
          padding: 2rem;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
        }
        .modal-content input, .modal-content textarea {
          width: 100%;
          padding: 0.8rem;
          margin: 0.5rem 0;
          border: 1px solid #ddd;
          border-radius: 6px;
        }
        .form-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }
        .form-buttons button {
          background: #ff6347;
          color: #fff;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }
        footer {
          text-align: center;
          padding: 1rem;
          background: #fff;
          box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
          margin-top: 2rem;
        }
        /* Dark mode */
        .dark-mode {
          background: #222;
          color: #eee;
        }
        .dark-mode header {
          background: #333;
          box-shadow: none;
        }
        .dark-mode nav a { color: #eee; }
        .dark-mode .blog-card { background: #333; color: #eee; }
        .dark-mode footer { background: #333; }
      `}</style>
    </div>
  );
};

export default FoodPage;
