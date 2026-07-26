// src/App.jsx
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-logo">🚀 TemplateApp</div>
        <nav>
          <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>
            Status: Ready
          </span>
        </nav>
      </header>

      <main className="app-main">
        <section className="welcome-card">
          <h1>Welcome to Your New Repository</h1>
          <p>
            This boilerplate setup includes standardized CSS variables, layout
            components, and resets.
          </p>

          <button
            type="button"
            className="cta-button"
            onClick={() => setCount((prev) => prev + 1)}
          >
            Clicks: {count}
          </button>
        </section>
      </main>

      <footer className="app-footer">
        <p>
          &copy; {new Date().getFullYear()} Template Sandbox. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
