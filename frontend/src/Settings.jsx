import { useState, useEffect } from 'react';

export default function Settings() {
  const [theme, setTheme] = useState('light');
  const [unitSize, setUnitSize] = useState('1U');

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/auth/check', {
      headers: { Authorization: token }
    }).then(res => res.json())
      .then(data => {
        setTheme(data.theme || 'light');
        setUnitSize(data.unitSize || '1U');
        document.body.className = data.theme || 'light';
      });
  }, []);

  const save = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/auth/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({ theme, unitSize })
    });
    if (res.ok) alert('Saved!');
  };

  return (
    <div>
      <h2>Settings</h2>
      <p>
        Theme: <select value={theme} onChange={e => {
          setTheme(e.target.value);
          document.body.className = e.target.value;
        }}>
          <option>light</option><option>dark</option>
        </select>
      </p>
      <p>
        Unit Size: <input value={unitSize} onChange={e => setUnitSize(e.target.value)} />
      </p>
      <button onClick={save}>Save</button>
    </div>
  );
}
