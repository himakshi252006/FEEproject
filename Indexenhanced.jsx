import React, { useState, useEffect } from "react";

const travelBlogsData = [
  {
    id: 1,
    title: "Exploring the Swiss Alps",
    description: "A journey through snowy peaks and cozy villages.",
    category: "Mountains",
    image: "https://source.unsplash.com/800x400/?switzerland,alps",
    likes: 0,
  },
  {
    id: 2,
    title: "Street Markets of Marrakech",
    description: "Colors, spices, and vibrant culture at every corner.",
    category: "Cities",
    image: "https://source.unsplash.com/800x400/?marrakech,market",
    likes: 0,
  },
  {
    id: 3,
    title: "Tropical Paradise in Bali",
    description: "Beaches, temples, and unforgettable sunsets.",
    category: "Beaches",
    image: "https://source.unsplash.com/800x400/?bali,beach",
    likes: 0,
  },
  {
    id: 4,
    title: "Majestic Rocky Mountains",
    description: "Hiking trails, scenic views, and pure nature.",
    category: "Mountains",
    image: "https://source.unsplash.com/800x400/?rocky,mountains",
    likes: 0,
  },
];

const TravelEchoHive = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [blogs, setBlogs] = useState(travelBlogsData);
  const [newBlog, setNewBlog] = useState({ title: "", description: "", image: "", category: "Mountains" });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const addBlog = (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.description || !newBlog.image) return;
    setBlogs([...blogs, { id: blogs.length + 1, likes: 0, ...newBlog }]);
    setNewBlog({ title: "", description: "", image: "", category: "Mountains" });
  };

  const likeBlog = (id) => {
    setBlogs(
      blogs.map((blog) => (blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog))
    );
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || blog.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogs.length);
    }, 4000); // 4 seconds per slide
    return () => clearInterval(interval);
  }, [blogs.length]);

  return (
    <div className={darkMode ? "dark" : ""} style={{ fontFamily: "Arial, sans-serif" }}>
      <header
        style={{
          backgroundColor: darkMode ? "#222" : "#f8f8f8",
          color: darkMode ? "#f8f8f8" : "#222",
          padding: "1rem",
          textAlign: "center",
          transition: "0.3s",
        }}
      >
        <h1>EchoHive – Travel Blogs</h1>
        <p>Discover Amazing Destinations and Travel Stories</p>
        <button
          onClick={toggleDarkMode}
          style={{ marginTop: "0.5rem", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Carousel / Slideshow */}
      <section
        style={{
          margin: "2rem auto",
          width: "90%",
          maxWidth: "900px",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
        }}
      >
        {blogs.length > 0 && (
          <img
            src={blogs[currentSlide].image}
            alt={blogs[currentSlide].title}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              transition: "0.5s ease-in-out",
            }}
          />
        )}
        <div
          style={{
            position: "relative",
            top: "-60px",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "#fff",
            padding: "1rem",
            textAlign: "center",
            fontSize: "1.2rem",
          }}
        >
          {blogs[currentSlide]?.title}
        </div>
      </section>

      <main style={{ padding: "2rem" }}>
        <section style={{ marginBottom: "2rem" }}>
          <h2>Filter & Search</h2>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: "0.5rem", flex: "1" }}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ padding: "0.5rem" }}
            >
              <option value="All">All Categories</option>
              <option value="Mountains">Mountains</option>
              <option value="Beaches">Beaches</option>
              <option value="Cities">Cities</option>
            </select>
          </div>
        </section>

        <section>
          <h2>Travel Stories</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: darkMode ? "#333" : "#fff",
                  color: darkMode ? "#fff" : "#000",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <div style={{ padding: "1rem" }}>
                  <h3>{blog.title}</h3>
                  <p>{blog.description}</p>
                  <p><strong>Category:</strong> {blog.category}</p>
                  <button
                    onClick={() => likeBlog(blog.id)}
                    style={{ cursor: "pointer", marginTop: "0.5rem", padding: "0.25rem 0.5rem" }}
                  >
                    ❤️ Like ({blog.likes})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: "3rem" }}>
          <h2>Add New Travel Blog</h2>
          <form
            onSubmit={addBlog}
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "400px" }}
          >
            <input
              type="text"
              name="title"
              placeholder="Blog Title"
              value={newBlog.title}
              onChange={handleChange}
              style={{ padding: "0.5rem" }}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newBlog.description}
              onChange={handleChange}
              style={{ padding: "0.5rem" }}
            />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={newBlog.image}
              onChange={handleChange}
              style={{ padding: "0.5rem" }}
            />
            <select
              name="category"
              value={newBlog.category}
              onChange={handleChange}
              style={{ padding: "0.5rem" }}
            >
              <option value="Mountains">Mountains</option>
              <option value="Beaches">Beaches</option>
              <option value="Cities">Cities</option>
            </select>
            <button type="submit" style={{ padding: "0.5rem", cursor: "pointer" }}>
              Add Blog
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default TravelEchoHive;
