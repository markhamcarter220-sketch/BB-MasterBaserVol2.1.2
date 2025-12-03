import React, { useState } from 'react';

export default function LogModal({ show, onClose, market }) {
  const [stake, setStake] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!stake) {
      setError("Stake is required.");
      return;
    }
    const bet = { market, stake, notes };
    try {
      const res = await fetch('/api/logBet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': 'demo_user' },
        body: JSON.stringify(bet)
      });
      if (!res.ok) throw new Error("Save failed");
      setStake('');
      setNotes('');
      setError('');
      onClose();
    } catch (err) {
      setError("Failed to log bet.");
    }
  };

  if (!show) return null;
  return (
    <div style={{
      position: 'fixed', top: 100, left: '10%', width: '80%', background: 'white',
      padding: 20, boxShadow: '0 0 10px rgba(0,0,0,0.2)', zIndex: 999
    }}>
      <h3>📝 Log Bet: {market}</h3>
      {error && <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>}
      <input type="number" placeholder="Stake amount" value={stake} onChange={(e) => setStake(e.target.value)} style={{ display: 'block', marginBottom: 10 }} />
      <textarea placeholder="Notes..." value={notes} onChange={(e) => setNotes(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      <button onClick={handleSave}>✅ Save</button>
    </div>
  );
}
