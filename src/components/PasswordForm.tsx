import React, { useState } from 'react';

interface Props {
  onCheck: (password: string) => void;
  isLoading: boolean;
}

export const PasswordForm: React.FC<Props> = ({ onCheck, isLoading }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      onCheck(password);
      setPassword('');
      setShowPassword(false); // Reset visibility for security
    }
  };

  return (
    <form onSubmit={handleSubmit} className="password-form">
      <div className="input-group">
        <div className="input-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password to check..."
            disabled={isLoading}
            autoFocus
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              // Eye Slash Icon (Hide)
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            ) : (
              // Eye Icon (Show)
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            )}
          </button>
        </div>
        <button type="submit" className="submit-btn" disabled={isLoading || !password}>
          {isLoading ? 'Checking...' : 'Check'}
        </button>
      </div>
      <small>Press Enter to submit</small>
    </form>
  );
};