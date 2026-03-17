'use client';

import { useState } from 'react';

interface PreorderButtonProps {
  className?: string;
  variant?: 'primary' | 'gold' | 'outline';
  size?: 'default' | 'large';
}

export function PreorderButton({ 
  className = '', 
  variant = 'primary',
  size = 'default' 
}: PreorderButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [error, setError] = useState('');

  const handlePreorder = async () => {
    if (!showEmailInput) {
      setShowEmailInput(true);
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Failed to create checkout');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const buttonClasses = {
    primary: 'vintage-button',
    gold: 'vintage-button vintage-button-gold',
    outline: 'vintage-button vintage-button-outline',
  };

  const sizeClasses = {
    default: 'text-sm py-2 px-6',
    large: 'text-lg px-12 py-4',
  };

  if (showEmailInput) {
    return (
      <div className={`flex flex-col items-center gap-3 ${className}`}>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="vintage-input flex-1"
            disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && handlePreorder()}
          />
          <button
            onClick={handlePreorder}
            disabled={isLoading}
            className={`${buttonClasses[variant]} ${sizeClasses.default} whitespace-nowrap`}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="animate-spin">🎳</span>
                Processing...
              </span>
            ) : (
              'Pay $8'
            )}
          </button>
        </div>
        {error && <p className="text-accent-red text-sm">{error}</p>}
        <button 
          onClick={() => setShowEmailInput(false)}
          className="text-xs text-ink-faded underline"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handlePreorder}
      className={`${buttonClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      Preorder Now — $8
    </button>
  );
}
