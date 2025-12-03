import React, { useEffect, useState } from 'react';

export default function RecentBets() {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    fetch('/api/logBet', { headers: { 'x-user-id': 'demo_user' } })
      .then(res => res.json())
      .then(data => setBets(data.slice(0, 5)))
      .catch(err => console.error("Failed to load bets", err));
  }, []);

  if (!bets.length) return <p>No logged bets yet.</p>;

  return (
    <div style={{ background: '#f3f3f3', padding: '1em', marginTop: 20 }}>
      <h4>📋 Recent Bets</h4>
      <ul>
        {bets.map((b, i) => (
          <li key={i} style={{ marginBottom: 6 }}>
            <strong>{b.market}</strong> — ${b.stake} — {b.notes || '—'}
          </li>
        ))}
      </ul>
    </div>
  );
}
