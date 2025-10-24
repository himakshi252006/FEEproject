import React, { useState, useEffect } from "react";

export default function FoodPage() {
  const STORAGE_KEY = "echohive_foodblogs_v1";
  const THEME_KEY = "echohive_theme_v1";
  const BLOGS_PER_PAGE = 4;

  const initialBlogs = [
    {
      title: "Street Foods Around the World",
      author: "Mia",
      date: "2025-08-10",
      shares: 520,
      likes: 33,
      desc: "From Bangkok to Mexico City, explore delicious street bites!",
      img: "https://images.unsplash.com/photo-1543352634-38c7d6b6d3c6?auto=format&fit=crop&w=1200&q=80",
      tags: ["street", "international"],
    },
    {
      title: "Top 5 Italian Pasta Dishes",
      author: "Luca",
      date: "2025-09-05",
      shares: 370,
      likes: 22,
      desc: "A deep dive into authentic Italian flavors and textures.",
      img: "https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bb1?auto=format&fit=crop&w=1200&q=80",
      tags: ["pasta", "italy"],
    },
    {
      title: "Healthy Smoothie Bowls",
      author: "Ava",
      date: "2025-07-25",
      shares: 245,
      likes: 15,
      desc: "Vibrant smoothie bowls packed with nutrition and flavor.",
      img: "https://images.unsplash.com/photo-1565958011705-44a2bd53f13b?auto=format&fit=crop&w=1200&q=80",
      tags: ["healthy", "breakfast"],
    },
    {
      title: "The Art of Sushi Making",
      author: "Hiro",
      date: "2025-06-15",
      shares: 460,
      likes: 42,
      desc: "A look into traditional sushi techniques and presentation.",
      img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
      tags: ["sushi", "japan"],
    },
  ];

  const [blogs, setBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialBlogs;
    } catch {
      return initialBlogs;
    }
  });
  const [dark, setDark] = useState(() => {
    try {
      const t = localStorage.getItem(THEME_KEY);
      return t === "dark";
    } catch {
      return false;
    }
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    desc: "",
    tags: "",
    img: "",
    date: "",
  });
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.body.className = dark ? "dark" : "";
    localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  }, [blogs]);

  const shorten = (text, max = 120) =>
    text.length > max ? text.slice(0, max - 1) + "…" : text;
  const formatDate = (d) => {
    const dt = new Date(d);
    return isNaN(dt) ? d : dt.toLocaleDateString();
  };

  const openModal = (index) => {
    if (index !== undefined) {
      setEditIndex(index);
      setFormData({
        ...blogs[index],
        tags: blogs[index].tags.join(","),
      });
    } else {
      setEditIndex(null);
      setFormData({
        title: "",
        author: "",
        desc: "",
        tags: "",
        img: "",
        date: "",
      });
    }
    setModalOpen(true);
  };

  const saveBlog = () => {
    const data = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
    };
    if (editIndex !== null) {
      const copy = [...blogs];
      copy[editIndex] = data;
      setBlogs(copy);
    } else {
      setBlogs([data, ...blogs]);
    }
    setModalOpen(false);
  };

  const deleteBlog = (index) => {
    if (window.confirm("Delete this blog?")) {
      setBlogs(blogs.filter((_, i) => i !== index));
    }
  };

  const toggleLike = (index) => {
    const copy = [...blogs];
    copy[index].likes += 1;
    setBlogs(copy);
  };

  const shareBlog = (blog) => {
    alert(`Sharing "${blog.title}"!`);
  };

  const filteredBlogs = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterTag ? b.tags.includes(filterTag) : true)
  );

  const allTags = [...new Set(blogs.flatMap((b) => b.tags))];
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  return (
    <div>
      <style>{`
        * { margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif; }
        body { background:#f9f9f9; color:#333; transition:background 0.3s,color 0.3s; }
        header { background:linear-gradient(to right,#fde68a,#fcd34d); padding:15px 20px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:10; box-shadow:0 2px 5px rgba(0,0,0,0.1); }
        .logo { font-size:18px; font-weight:bold; color:#222; letter-spacing:1px; }
        nav ul { list-style:none; display:flex; gap:20px; }
        nav ul li a { text-decoration:none; color:#222; font-weight:600; transition:color 0.2s; }
        nav ul li a:hover { color:#d97706; }
        .search-box { display:flex; align-items:center; background:white; border-radius:20px; padding:5px 12px; border:1px solid #ddd; }
        .search-box input { border:none; outline:none; font-size:14px; background:transparent; padding:5px; width:120px; }
        .theme-toggle { font-size:18px; cursor:pointer; }
        .plus-btn { font-size:20px; font-weight:bold; padding:6px 12px; border:none; border-radius:50%; background:#f59e0b; color:white; cursor:pointer; }
        .plus-btn:hover { background:#d97706; }
        .hero { height:60vh; background:url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat; display:flex; justify-content:center; align-items:center; color:white; text-align:center; position:relative; }
        .hero::after { content:''; position:absolute; inset:0; background:rgba(0,0,0,0.5); }
        .hero-content { position:relative; z-index:2; }
        .hero-content h1 { font-size:48px; margin-bottom:10px; }
        .container { max-width:1200px; margin:60px auto; padding:0 20px; }
        .blog-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:20px; }
        .blog-card { background:white; border-radius:12px; overflow:hidden; box-shadow:0 4px 8px rgba(0,0,0,0.1); transition:transform 0.3s; }
        .blog-card:hover { transform:translateY(-5px); }
        .blog-card img { width:100%; height:180px; object-fit:cover; }
        .blog-content { padding:15px; }
        .blog-title { font-size:18px; font-weight:bold; margin-bottom:8px; color:#222; }
        .blog-meta { font-size:13px; color:#777; margin-bottom:10px; }
        .btn { background:#f59e0b; color:white; border:none; padding:6px 12px; border-radius:6px; cursor:pointer; margin:2px; }
        .btn:hover { background:#d97706; }
        .like-btn,.share-btn { border:none; background:#f3f4f6; padding:6px 10px; border-radius:6px; cursor:pointer; }
        .like-btn.active { background:#fecaca; }
        #blogFormContainer { display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:white; padding:20px; border-radius:12px; box-shadow:0 4px 8px rgba(0,0,0,0.3); z-index:1000; width:90%; max-width:400px; }
        #blogFormContainer input, #blogFormContainer textarea { width:100%; margin:6px 0; padding:8px; border:1px solid #ddd; border-radius:6px; }
        body.dark { background:#1e293b; color:#e2e8f0; }
        body.dark header { background:linear-gradient(to right,#78350f,#451a03); }
        body.dark .blog-card { background:#334155; color:#f1f5f9; }
        body.dark .btn { background:#f59e0b; }
        @media(max-width:720px){ .hero-content h1{font-size:34px;} nav ul{display:none;} }
      `}</style>

      <header>
        <div className="logo">ECHOHIVE - FOOD</div>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Destinations</a></li>
            <li><a href="#">Culture</a></li>
          </ul>
        </nav>
        <div className="nav-right" style={{ display: "flex", gap: "12px" }}>
          <div className="search-box">
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="theme-toggle" onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </div>
          <button className="plus-btn" onClick={() => openModal()}>
            +
          </button>
        </div>
      </header>

      <div className="hero">
        <div className="hero-content">
          <h1>Delicious Journeys Await</h1>
          <p>Explore world cuisines and stories behind every flavor.</p>
        </div>
      </div>

      <div className="container">
        <h2>Food Blogs</h2>
        <div className="controls" style={{ marginBottom: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {allTags.map((tag) => (
            <div
              key={tag}
              className={`chip ${filterTag === tag ? "active" : ""}`}
              onClick={() => setFilterTag(filterTag === tag ? "" : tag)}
              style={{
                padding: "6px 10px",
                borderRadius: "999px",
                background: filterTag === tag ? "#f59e0b" : "#efefef",
                color: filterTag === tag ? "white" : "#333",
                cursor: "pointer",
                border: "1px solid #ddd",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="blog-grid">
          {paginatedBlogs.map((b, i) => (
            <div key={i} className="blog-card">
              <img src={b.img} alt={b.title} />
              <div className="blog-content">
                <div className="blog-title">{b.title}</div>
                <div className="blog-meta">
                  By {b.author} | {formatDate(b.date)} | {b.shares} shares
                </div>
                <div className="blog-desc">{shorten(b.desc)}</div>
                <div className="card-actions" style={{ marginTop: "10px" }}>
                  <button
                    className="like-btn"
                    onClick={() =>
                      toggleLike((currentPage - 1) * BLOGS_PER_PAGE + i)
                    }
                  >
                    ❤️ {b.likes}
                  </button>
                  <button className="share-btn" onClick={() => shareBlog(b)}>
                    🔗 Share
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      openModal((currentPage - 1) * BLOGS_PER_PAGE + i)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      deleteBlog((currentPage - 1) * BLOGS_PER_PAGE + i)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination" style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "20px" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                background: currentPage === i + 1 ? "#f59e0b" : "white",
                color: currentPage === i + 1 ? "white" : "#333",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {modalOpen && (
        <div id="blogFormContainer" style={{ display: "block" }}>
          <h3>{editIndex !== null ? "Edit Blog" : "Add Blog"}</h3>
          <input
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            placeholder="Author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          />
          <input
            placeholder="Date YYYY-MM-DD"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          <input
            placeholder="Image URL"
            value={formData.img}
            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
          />
          <input
            placeholder="Tags comma-separated"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
          />
          <div>
            <button className="btn" onClick={saveBlog}>
              Save
            </button>
            <button className="btn" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
