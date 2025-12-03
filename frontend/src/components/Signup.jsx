import React, { useState } from 'react';

export default function Signup({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const register = async () => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Signup error');
      setStatus('Account created!');
      setTimeout(() => onSignup(), 1000);
    } catch (err) {
      setStatus('Error: Username taken or invalid');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Signup</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={register}>Register</button>
      {status && <p>{status}</p>}
    </div>
  );
}
