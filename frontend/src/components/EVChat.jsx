import React, { useState } from "react";
import { apiPost } from "../apiClient";

export default function EVChat() {
  const [form, setForm] = useState({
    odds: "",
    impliedProb: "",
    stake: "",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = await apiPost("/api/ev-chat/calculate", {
        odds: Number(form.odds),
        impliedProb: form.impliedProb !== "" ? Number(form.impliedProb) : undefined,
        stake: Number(form.stake),
      });
      setResult(payload);
    } catch (err) {
      console.error("EV chat error", err);
      setError(err.message || "Failed to calculate EV");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bb-module-card">
      <h2 className="bb-module-title">EV Chat</h2>
      <p className="bb-module-body">
        Quick expected value check for a single bet. Enter odds, probability,
        and stake to see EV, breakeven probability, and edge.
      </p>

      <form className="bb-module-body" onSubmit={handleSubmit}>
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
            Win Probability (0–1, optional)
            <input
              name="impliedProb"
              type="number"
              step="0.01"
              min="0"
              max="1"
              value={form.impliedProb}
              onChange={handleChange}
            />
          </label>
        </div>
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
        <button className="bb-btn" type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Calculate EV"}
        </button>
      </form>

      {error && <div className="bb-error">{error}</div>}

      {result && result.ok && (
        <div className="bb-module-body">
          <div>EV: {result.ev != null ? result.ev.toFixed(2) : "N/A"}</div>
          <div>
            Breakeven Probability:{" "}
            {result.breakEvenProb != null
              ? (result.breakEvenProb * 100).toFixed(2) + "%"
              : "N/A"}
          </div>
          <div>
            Edge:{" "}
            {result.edgePct != null
              ? result.edgePct.toFixed(2) + "%"
              : "N/A"}
          </div>
        </div>
      )}
    </section>
  );
}
