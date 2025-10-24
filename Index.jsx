import React, { useState, useEffect } from "react";

export default function Destination() {
  const [destinations] = useState([
    {
      name: "Manali",
      description:
        "Snow-covered peaks, lush valleys, and adventures await you in Manali.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Manali_City.jpg/800px-Manali_City.jpg",
    },
    {
      name: "Goa",
      description:
        "Golden beaches, nightlife, and tropical vibes — welcome to Goa!",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Goa_Baga_Beach.jpg/800px-Goa_Baga_Beach.jpg",
    },
    {
      name: "Jaipur",
      description:
        "The Pink City — full of heritage, palaces, and vibrant markets.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Hawa_Mahal_2011.jpg/800px-Hawa_Mahal_2011.jpg",
    },
    {
      name: "Kerala",
      description:
        "Backwaters, greenery, and serenity — experience God's own country.",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Houseboat_Alleppey.jpg/800px-Houseboat_Alleppey.jpg",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(destinations);
  const [theme, setTheme] = useState("light");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    setFiltered(
      destinations.filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, destinations]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // Add custom hover and animation styles dynamically
  const cardStyle = {
    backgroundColor: theme === "light" ? "#fff" : "#1f1f1f",
    borderRadius: "14px",
    boxShadow:
      theme === "light"
        ? "0 4px 14px rgba(0,0,0,0.1)"
        : "0 4px 14px rgba(255,255,255,0.1)",
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ease",
    cursor: "pointer",
    opacity: fadeIn ? 1 : 0,
    animation: "fadeInUp 0.6s ease forwards",
  };

  const hoverEffect = {
    transform: "translateY(-6px) scale(1.03)",
    boxShadow:
      theme === "light"
        ? "0 8px 20px rgba(0,0,0,0.15)"
        : "0 8px 20px rgba(255,255,255,0.15)",
  };

  return (
    <div
      className={`destination-page ${theme}`}
      style={{
        fontFamily: "Poppins, sans-serif",
        backgroundColor: theme === "light" ? "#f5f5f5" : "#121212",
        color: theme === "light" ? "#222" : "#fff",
        minHeight: "100vh",
        transition: "background-color 0.4s, color 0.4s",
      }}
    >
      {/* Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <h1 style={{ margin: 0, fontSize: "28px", letterSpacing: "0.5px" }}>
          🌍 EchoHive Destinations
        </h1>
        <button
          onClick={toggleTheme}
          style={{
            padding: "8px 15px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: theme === "light" ? "#333" : "#eee",
            color: theme === "light" ? "#fff" : "#111",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      {/* Search Bar */}
      <div style={{ textAlign: "center", margin: "50px 0 25px" }}>
        <input
          type="text"
          placeholder="Search Destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "60%",
            padding: "12px 20px",
            borderRadius: "30px",
            border: "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
            transition: "0.3s",
          }}
        />
      </div>

      {/* Destination Cards */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          padding: "20px 60px",
        }}
      >
        {filtered.length > 0 ? (
          filtered.map((dest, i) => (
            <div
              key={i}
              style={cardStyle}
              onMouseEnter={(e) =>
                Object.assign(e.currentTarget.style, hoverEffect)
              }
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, cardStyle)
              }
            >
              <img
                src={dest.image}
                alt={dest.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
              />
              <div style={{ padding: "15px" }}>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontSize: "18px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {dest.name}
                </h3>
                <p style={{ fontSize: "15px", lineHeight: "1.5" }}>
                  {dest.description}
                </p>
                <button
                  style={{
                    marginTop: "10px",
                    backgroundColor:
                      theme === "light" ? "#0078ff" : "#4caf50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 14px",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "0.3s",
                  }}
                  onClick={() =>
                    alert(`You selected ${dest.name}! Pack your bags! 🎒`)
                  }
                >
                  Explore
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3 style={{ gridColumn: "1/-1", textAlign: "center" }}>
            ❌ No destinations found.
          </h3>
        )}
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "20px",
          backgroundColor: theme === "light" ? "#fff" : "#1e1e1e",
          marginTop: "60px",
          boxShadow: "0 -2px 8px rgba(0,0,0,0.1)",
          transition: "0.3s",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px" }}>
          © 2025 EchoHive Travel Portal. All Rights Reserved.
        </p>
      </footer>

      {/* CSS Animations injected inline */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
