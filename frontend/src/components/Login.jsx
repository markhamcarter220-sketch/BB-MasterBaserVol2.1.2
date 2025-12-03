import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) throw new Error('Invalid login');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      onLogin(data.user);
    } catch (err) {
      setError('Login failed. Check credentials.');
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <br />
      <button onClick={login}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
