import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchSettings, updateSettings } from '../helpers/api';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Load theme from backend on mount (only when authenticated)
  useEffect(() => {
    const token = localStorage.getItem('googleAuthToken');
    if (!token) return;

    fetchSettings()
      .then((settings) => {
        const remoteTheme = settings?.theme;
        if (remoteTheme === 'light' || remoteTheme === 'dark') {
          setTheme(remoteTheme);
        }
      })
      .catch(() => {
        // Not authenticated yet or network error — fall back to localStorage
      });
  }, []);

  // Apply class to <html> and persist locally
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      // Persist to backend (fire-and-forget)
      updateSettings({ theme: next }).catch(() => { });
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
