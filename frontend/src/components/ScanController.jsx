import { useState } from 'react';
import ResultsList from './ResultsList';

// Simulate an EV transform on the client side. We import a helper function
// from the frontend utils directory rather than relying on backend code.
import transformOddsToEV from '../utils/transformOddsToEV.js';
export default function ScanController() {
  const [results, setResults] = useState([]);
  const onScan = async () => {
    const mock = [{ market:'ML', price:-110 }];
    const out = transformOddsToEV(mock);
    setResults(out);
  };
  return (
    <div>
      <button onClick={onScan}>Scan</button>
      <ResultsList results={results} />
    </div>
  );
}