import React, { useEffect, useState } from 'react';

/**
 * BetHistory provides a simple interface to view, delete and restore logged bets.
 * Bets are loaded from the backend at mount time. Each bet entry includes the
 * match/market, bookmaker, stake, odds and timestamp. Users can delete a bet,
 * undo the most recent deletion, and export the current list of bets to CSV.
 */
export default function BetHistory() {
  const [bets, setBets] = useState([]);
  const [lastDeleted, setLastDeleted] = useState(null);

  // Fetch the most recent logged bets when the component mounts.
  useEffect(() => {
    fetch('/api/logBet', { headers: { 'x-user-id': 'demo_user' } })
      .then((res) => res.json())
      .then((data) => {
        // Expecting an array of bet objects from the server. Fall back to [] if not.
        setBets(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error('Failed to load bet history', err));
  }, []);

  // Delete a bet from the current list and persist the deletion to the server.
  const handleDelete = (index) => {
    const betToDelete = bets[index];
    setLastDeleted(betToDelete);
    setBets(bets.filter((_, i) => i !== index));
    // Notify the backend of the deletion; ignore errors for now.
    fetch('/api/logBet/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': 'demo_user' },
      body: JSON.stringify(betToDelete),
    }).catch(() => {});
  };

  // Restore the last deleted bet and persist it to the server.
  const undoDelete = () => {
    if (!lastDeleted) return;
    const restored = lastDeleted;
    setBets((prev) => [...prev, restored]);
    fetch('/api/logBet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': 'demo_user' },
      body: JSON.stringify(restored),
    }).catch(() => {});
    setLastDeleted(null);
  };

  // Export the current bets to a CSV file and trigger a download in the browser.
  const downloadCSV = () => {
    if (bets.length === 0) return;
    const headers = ['Market', 'Book', 'Stake', 'Odds', 'Edge', 'Timestamp'];
    const rows = bets.map((bet) => {
      const { market, book, stake, odds, edge, time } = bet;
      return [market, book, stake, odds, edge, new Date(time).toLocaleString()].join(',');
    });
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bets_export.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
      <h2>📋 Bet History</h2>
      {bets.length === 0 ? (
        <p>No bets logged yet.</p>
      ) : (
        <>
          <button onClick={downloadCSV} style={{ marginBottom: '0.5rem' }}>
            ⬇️ Export CSV
          </button>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {bets.map((bet, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                <strong>{bet.market}</strong> | {bet.book} | Stake: ${bet.stake} @ {bet.odds} | Edge: {bet.edge}% |{' '}
                {new Date(bet.time).toLocaleString()}
                <button
                  onClick={() => handleDelete(index)}
                  style={{ marginLeft: '0.5rem' }}
                >
                  🗑️ Delete
                </button>
              </li>
            ))}
          </ul>
          {lastDeleted && (
            <button onClick={undoDelete} style={{ marginTop: '0.5rem' }}>
              ↩️ Undo Last Delete
            </button>
          )}
        </>
      )}
    </section>
  );
}