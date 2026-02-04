import React, { useState } from 'react';

interface Props {
  onCheck: (password: string) => void;
  isLoading: boolean;
}

export const PasswordForm: React.FC<Props> = ({ onCheck, isLoading }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      onCheck(password);
      setPassword(''); // Clear immediately for security
    }
  };

  return (
    <form onSubmit={handleSubmit} className="password-form">
      <div className="input-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password to check..."
          disabled={isLoading}
          autoFocus
        />
        <button type="submit" disabled={isLoading || !password}>
          {isLoading ? 'Checking...' : 'Check'}
        </button>
      </div>
      <small>Press Enter to submit</small>
    </form>
  );
};