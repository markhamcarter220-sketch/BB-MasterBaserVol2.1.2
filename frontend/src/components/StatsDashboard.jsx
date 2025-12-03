
import React from 'react';

function StatsDashboard({ bets }) {
  const totalStake = bets.reduce((sum, bet) => sum + Number(bet.stake || 0), 0);
  const totalProfit = bets.reduce((sum, bet) => {
    const stake = Number(bet.stake || 0);
    const odds = Number(bet.odds || 0);
    const profit = odds > 0 ? (odds / 100) * stake : (100 / Math.abs(odds)) * stake;
    return sum + profit;
  }, 0);
  const avgEdge = bets.length ? bets.reduce((sum, b) => sum + Number(b.edge || 0), 0) / bets.length : 0;
  const roi = totalStake ? (totalProfit / totalStake) * 100 : 0;

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', marginBottom: '1rem' }}>
      <h2>📊 Betting Stats</h2>
      <p>Total Bets: {bets.length}</p>
      <p>Total Stake: ${totalStake.toFixed(2)}</p>
      <p>Total Profit: ${totalProfit.toFixed(2)}</p>
      <p>ROI: {roi.toFixed(2)}%</p>
      <p>Avg Edge: {avgEdge.toFixed(2)}%</p>
    </div>
  );
}

export default StatsDashboard;
