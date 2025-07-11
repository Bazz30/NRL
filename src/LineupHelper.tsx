import { useState } from 'react';
import { players } from './data/players';

export default function LineupHelper() {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getLineupAdvice = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/lineup-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamData: players }),  // <-- USING players here!
      });
      const data = await response.json();
      setAdvice(data.advice);
    } catch (error) {
      console.error('Error fetching advice:', error);
      setAdvice('Error fetching advice');
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={getLineupAdvice} disabled={loading}>
        {loading ? 'Loading...' : 'Get Best Lineup'}
      </button>

      {advice && (
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: '1em' }}>{advice}</pre>
      )}
    </div>
  );
}
