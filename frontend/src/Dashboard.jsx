import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome back!</p>
      <EVScanner />
      <div style={{marginTop:20}}>
        <h3>📈 EV Edge Scanner</h3>
        <p>Coming soon: real-time value bets will appear here.</p>
      </div>
      <button onClick={() => navigate('/settings')}>Settings</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
