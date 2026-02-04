import { useState } from 'react';
import { PasswordForm } from './components/PasswordForm';
import { ResultCard } from './components/ResultCard';
import { SecurityInfo } from './components/SecurityInfo';
import { Footer } from './components/Footer';
import { hashPassword } from './utils/hash';
import { fetchBreachSuffixes } from './services/breachApi';
import { checkForMatch } from './utils/parseResponse';
import type { BreachResult, LoadingState } from './types/breach';
// import './styles/main.css';

function App() {
  const [result, setResult] = useState<BreachResult | null>(null);
  const [status, setStatus] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async (password: string) => {
    try {
      setStatus('hashing');
      setError(null);
      setResult(null);

      // 1. Hash locally
      const fullHash = await hashPassword(password);
      
      // 2. Split Hash (k-Anonymity)
      const prefix = fullHash.substring(0, 5);
      const suffix = fullHash.substring(5);

      setStatus('fetching');
      
      // 3. Fetch Suffixes
      const apiResponse = await fetchBreachSuffixes(prefix);
      
      // 4. Local Comparison
      const count = checkForMatch(apiResponse, suffix);

      setResult({
        isBreached: count > 0,
        count: count,
        checkedAt: new Date()
      });
      
      setStatus('done');
    } catch (err) {
      console.error(err);
      setError("Failed to check password. Please check your connection.");
      setStatus('error');
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>🔐 Breach Checker</h1>
        <p className="subtitle">Check your password without revealing it.</p>
      </header>

      <main>
        <PasswordForm onCheck={handleCheck} isLoading={status === 'hashing' || status === 'fetching'} />
        
        {error && <div className="error-msg">{error}</div>}
        
        <ResultCard result={result} />
        
        <SecurityInfo />
      </main>

      <Footer />
    </div>
  );
}

export default App;