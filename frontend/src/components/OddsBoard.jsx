import React, { useState } from "react";
import { apiGet } from "../apiClient";

export default function OddsBoard() {
  const [sport, setSport] = useState("");
  const [book, setBook] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFetch(e) {
    e.preventDefault();
    if (!sport) {
      setError("Please enter a sport key (e.g. americanfootball_nfl)");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.set("sport", sport);
      if (book) params.set("book", book);
      const payload = await apiGet(`/api/odds/fetch?${params.toString()}`);
      setGames(Array.isArray(payload.games) ? payload.games : []);
    } catch (err) {
      console.error("Odds board error", err);
      setError(err.message || "Failed to fetch odds");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bb-module-card">
      <h2 className="bb-module-title">Odds Feed Integrator</h2>
      <p className="bb-module-body">
        Pull raw odds for a single sport and (optionally) book. This is a thin
        wrapper around the The Odds API and is ideal for building scanning
        tools and dashboards.
      </p>

      <form className="bb-module-body" onSubmit={handleFetch}>
        <div className="bb-form-row">
          <label>
            Sport key
            <input
              type="text"
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              placeholder="americanfootball_nfl"
            />
          </label>
        </div>
        <div className="bb-form-row">
          <label>
            Book key (optional)
            <input
              type="text"
              value={book}
              onChange={(e) => setBook(e.target.value)}
              placeholder="fanduel, draftkings, etc."
            />
          </label>
        </div>
        <button className="bb-btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Fetch Odds"}
        </button>
      </form>

      {error && <div className="bb-error">{error}</div>}

      {games && games.length > 0 && (
        <div className="bb-module-body">
          <div>Games returned: {games.length}</div>
          <ul className="bb-history-list">
            {games.slice(0, 5).map((g) => (
              <li key={g.id || g.commence_time}>
                {g.home_team} vs {g.away_team} — {g.sport_title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
