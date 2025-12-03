import { useEffect, useState } from 'react';
import Login from './Login';

export default function AppRouter() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [unitSize, setUnitSize] = useState('1U');

  const [view, setView] = useState('dashboard');

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const onLogin = (token, userData) => {
    setUser(token);
    setTheme(userData.theme);
    setUnitSize(userData.unitSize);
  };

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await fetch('/api/auth/check', {
          headers: { Authorization: token }
        });
        if (!res.ok) {
          logout();
        } else {
          const userRes = await res.json();
          setUser(token);
          setTheme(userRes.theme || 'light');
          document.body.className = userRes.theme || 'light';
          setUnitSize(userRes.unitSize || '1U');
        }
      }
    };
    checkSession();
  }, []);

  if (!user) return <Login onLogin={onLogin} />;

  return (
    <div>
      <h2>{view.charAt(0).toUpperCase() + view.slice(1)}</h2>
      
      <nav>
        <button onClick={() => setView('dashboard')}>Dashboard</button>
        <button onClick={() => setView('settings')}>Settings</button>
      </nav>

      {view === 'dashboard' && (<p>Welcome back! <button onClick={logout}>Logout</button></p>)}
      {view === 'settings' && (<p>
        <b>Theme:</b> <select value={theme} onChange={e => setTheme(e.target.value)}>
          <option>light</option><option>dark</option>
        </select> &nbsp;
        <b>Unit:</b> <input value={unitSize} onChange={e => setUnitSize(e.target.value)} style={{width:'50px'}} />
      </p>)}
    </div>
  );
}
