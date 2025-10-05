import React, { useState } from "react";
import { Link } from "react-router-dom";

type Tip = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
};

const initialTips: Tip[] = [
  {
    id: 1,
    author: "Alice",
    content:
      "Use the Pomodoro technique to stay focused and take regular breaks.",
    timestamp: new Date().toLocaleString(),
  },
  {
    id: 2,
    author: "Bob",
    content: "Summarize what you learned at the end of each study session.",
    timestamp: new Date().toLocaleString(),
  },
];

const ForumPage: React.FC = () => {
  const [tips, setTips] = useState<Tip[]>(initialTips);
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "date">("recent");
  // Helper to get sorted tips
  function getSortedTips() {
    if (sortBy === "recent") {
      return [...tips];
    } else if (sortBy === "popular") {
      // For demo, just show first 3 as 'popular'
      return tips.slice(0, 3);
    } else if (sortBy === "date") {
      return [...tips].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }
    return tips;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;
    setTips([
      {
        id: Date.now(),
        author: author.trim(),
        content: content.trim(),
        timestamp: new Date().toLocaleString(),
      },
      ...tips,
    ]);
    setAuthor("");
    setContent("");
  };

  return (
    <main
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        padding: "2.5rem 2rem",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
          color: "#a21caf",
          fontWeight: 800,
          marginBottom: "1.5rem",
          letterSpacing: 1,
        }}
      >
        📢 Study Tips Forum
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          style={{
            padding: "0.5rem",
            borderRadius: 8,
            border: "1px solid #e9d5ff",
            fontSize: "1rem",
          }}
        />
        <textarea
          placeholder="Share your best study tip..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
          style={{
            padding: "0.5rem",
            borderRadius: 8,
            border: "1px solid #e9d5ff",
            fontSize: "1rem",
            resize: "vertical",
          }}
        />
        <button
          type="submit"
          style={{
            alignSelf: "flex-end",
            padding: "0.5rem 1.5rem",
            background: "linear-gradient(90deg, #a21caf 0%, #f472b6 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(162,28,175,0.08)",
            transition: "background 0.2s",
          }}
        >
          Post Tip
        </button>
      </form>
      <section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <h2
            style={{
              color: "#a21caf",
              fontSize: "1.25rem",
              fontWeight: 700,
              marginBottom: 0,
            }}
          >
            Tips
          </h2>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "recent" | "popular" | "date")
            }
            style={{
              padding: "0.3rem 0.7rem",
              borderRadius: 8,
              border: "1px solid #e9d5ff",
              fontSize: "1rem",
              background: "#faf5ff",
              color: "#a21caf",
              fontWeight: 600,
              outline: "none",
              marginLeft: "1rem",
            }}
          >
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
            <option value="date">Date</option>
          </select>
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {getSortedTips().length === 0 && (
            <li style={{ color: "#a0aec0", textAlign: "center" }}>
              No tips yet. Be the first to post!
            </li>
          )}
          {getSortedTips().map((tip) => (
            <li
              key={tip.id}
              style={{
                background: "#f3e8ff",
                borderRadius: 10,
                padding: "1rem",
                boxShadow: "0 1px 4px rgba(162,28,175,0.07)",
                display: "flex",
                flexDirection: "column",
                gap: 4,
              }}
            >
              <div style={{ fontWeight: 600, color: "#a21caf" }}>
                {tip.author}
              </div>
              <div style={{ color: "#4a044e", margin: "0.25rem 0" }}>
                {tip.content}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#666e78ff",
                  alignSelf: "flex-end",
                }}
              >
                {tip.timestamp}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default ForumPage;
