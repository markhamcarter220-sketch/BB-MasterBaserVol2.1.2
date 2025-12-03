import React, { useState, useEffect } from "react";
import { apiGet, apiPost } from "../apiClient";

export default function BankrollChat() {
  const [sessionId] = useState("default");
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({
    stake: "",
    odds: "",
    result: "win",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function refresh() {
    try {
      setError("");
      const [s, h] = await Promise.all([
        apiGet(`/api/bankroll/session-summary?sessionId=${encodeURIComponent(sessionId)}`),
        apiGet(`/api/bankroll/history?sessionId=${encodeURIComponent(sessionId)}`),
      ]);
      setSummary(s.summary || null);
      setHistory((h.history && h.history.bets) || []);
    } catch (err) {
      console.error("Bankroll refresh error", err);
      setError(err.message || "Unable to load bankroll data");
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiPost("/api/bankroll/log-bet", {
        sessionId,
        stake: Number(form.stake),
        odds: Number(form.odds),
        result: form.result,
      });
      await refresh();
      setForm({ stake: "", odds: "", result: form.result });
    } catch (err) {
      console.error("Log bet error", err);
      setError(err.message || "Failed to log bet");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="bb-module-card">
      <h2 className="bb-module-title">Bankroll Chat</h2>
      <p className="bb-module-body">
        Track session bankroll, log bets, and monitor profit &amp; loss.
      </p>

      {summary && (
        <div className="bb-module-body">
          <div>Session: <strong>{summary.sessionId}</strong></div>
          <div>Starting Bankroll: ${summary.startingBankroll}</div>
          <div>Current Bankroll: ${summary.bankroll}</div>
          <div>Profit / Loss: ${summary.profitLoss}</div>
          <div>Bets Placed: {summary.betsPlaced}</div>
        </div>
      )}

      <form className="bb-module-body" onSubmit={handleSubmit}>
        <div className="bb-form-row">
          <label>
            Stake ($)
            <input
              name="stake"
              type="number"
              step="1"
              value={form.stake}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="bb-form-row">
          <label>
            Odds (American)
            <input
              name="odds"
              type="number"
              step="1"
              value={form.odds}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="bb-form-row">
          <label>
            Result
            <select name="result" value={form.result} onChange={handleChange}>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
              <option value="push">Push</option>
            </select>
          </label>
        </div>
        <button className="bb-btn" type="submit" disabled={loading}>
          {loading ? "Logging..." : "Log Bet"}
        </button>
      </form>

      {error && <div className="bb-error">{error}</div>}

      {history && history.length > 0 && (
        <div className="bb-module-body">
          <h3 className="bb-module-subtitle">Recent Bets</h3>
          <ul className="bb-history-list">
            {history.slice(0, 5).map((bet) => (
              <li key={bet.id}>
                <span>{bet.ts}</span> — stake ${bet.stake} @ {bet.odds} (
                {bet.result}) → {bet.profit >= 0 ? "+" : ""}{bet.profit}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
