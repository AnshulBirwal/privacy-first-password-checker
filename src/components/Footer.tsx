import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer>
      <p>
        Built with React, Vite & Web Crypto API. <br />
        <a href="https://haveibeenpwned.com/API/v3" target="_blank" rel="noreferrer">
          Powered by Have I Been Pwned API
        </a>
      </p>
    </footer>
  );
};