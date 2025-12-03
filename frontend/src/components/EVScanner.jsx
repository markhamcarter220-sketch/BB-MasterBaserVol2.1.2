import React, { useEffect, useState } from 'react';

// Modal and subcomponents need to be imported at the top of the file, not inside the component body.
import LogModal from './LogModal';
import RecentBets from './RecentBets';

export default function EVScanner() {
  const [edges, setEdges] = useState([]);
  const [book, setBook] = useState('All');
  const [sport, setSport] = useState('All');
  const [minEdge, setMinEdge] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchEdges = async () => {
    const query = `?book=${book}&sport=${sport}&minEdge=${minEdge}`;
    setLoading(true);
    const res = await fetch(`/api/math/edges${query}`);
    const data = await res.json();
    setEdges(data.edges || []);
    setLastUpdated(new Date().toLocaleTimeString());
    setLoading(false);
  };

  useEffect(() => {
    fetchEdges();
  }, []);

  const handleLog = (market) => {
    setSelectedMarket(market);
    setShowModal(true);
    setToast(`Logged: ${market}`);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>📈 EV Edge Scanner</h3>
      <div style={{ marginBottom: 10 }}>
        <label>Book:</label>
        <select onChange={e => setBook(e.target.value)}>
          <option>All</option><option>FanDuel</option><option>DraftKings</option><option>BetMGM</option>
        </select>
        <label>Sport:</label>
        <select onChange={e => setSport(e.target.value)}>
          <option>All</option><option>NBA</option><option>NFL</option><option>Soccer</option><option>Tennis</option>
        </select>
        <label>Min Edge %:</label>
        <input type="number" value={minEdge} onChange={e => setMinEdge(e.target.value)} />
        <button onClick={fetchEdges}>🔄 Refresh</button>
      </div>
      <p>Last updated: {lastUpdated}</p>
      {loading ? <p>Loading...</p> : (
        <ul>
          {edges.map((edge, idx) => (
            <li key={idx}><button onClick={() => handleLog(edge.market)} style={{ marginRight: '10px' }}>Log Bet</button>
              <b>{edge.market}</b> ({edge.sport}, {edge.book}): +{edge.edge_pct}% edge
            </li>
          ))}
        </ul>
      )}
    {toast && <div style={{ color: 'green' }}>{toast}</div>}
      <LogModal show={showModal} market={selectedMarket} onClose={() => setShowModal(false)} />
      <RecentBets />
    </div>
  );
}
