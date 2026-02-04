import React from 'react';
import type { BreachResult } from '../types/breach'; // custom type

interface Props {
  result: BreachResult | null;
}

export const ResultCard: React.FC<Props> = ({ result }) => {
  if (!result) return null;

  const isSafe = !result.isBreached;

  return (
    <div className={`result-card ${isSafe ? 'safe' : 'danger'}`}>
      <h2>{isSafe ? '✅ Looks safe to use' : '⚠️ Breach Detected'}</h2>
      
      <p className="result-text">
        {isSafe 
          ? "This password was not found in the public database." 
          : `This password has appeared in ${result.count.toLocaleString()} known data breaches.`}
      </p>

      {!isSafe && (
        <div className="recommendation">
          <strong>Recommendation:</strong> Do not use this password anywhere.
        </div>
      )}
    </div>
  );
};