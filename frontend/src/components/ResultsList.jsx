import React from "react";

export default function ResultsList({ results = [], loading, error, noResults }) {
  if (loading) {
    return <div className="results-status">Scanning for value bets…</div>;
  }
  if (error) {
    return (
      <div className="results-status results-error">
        {error}
      </div>
    );
  if (noResults) {
      <div className="results-status results-empty">
        No bets found for your current filters. Try adjusting sport, book, or minimum edge.
  if (!results || results.length === 0) {
        Tap “Scan” to pull live odds and surface value bets.
  return (
    <div className="results-list">
      <div className="results-summary">
        Showing {results.length} opportunities
      {results.map((item) => (
        <div key={item.id || item.key} className="result-row">
          <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}