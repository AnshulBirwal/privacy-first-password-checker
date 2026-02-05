import React from 'react';

export const SecurityInfo: React.FC = () => {
  return (
    <div className="security-info">
      <h3>🛡️ How is this private?</h3>
      <ul>
        <li>
          <strong>k-Anonymity:</strong> I only send the first 5 characters of your password's hash (SHA-1) to the API.
        </li>
        <li>
          <strong>Local Processing:</strong> The API sends back hundreds of potential matches. Your browser finds the specific match locally.
        </li>
        <li>
          <strong>Zero Knowledge:</strong> The server never sees your password or your full hash.
        </li>
        <li>
          <strong>Open Source:</strong> Check out the full source code here: <a href="https://github.com/AnshulBirwal/privacy-first-password-checker" target="_blank" rel="noreferrer">
            View Source on GitHub
          </a>
        </li>
      </ul>
    </div>
  );
};