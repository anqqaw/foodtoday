import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SettingsView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 dark:bg-black text-gray-900 dark:text-white transition-colors p-6">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-amber-100 dark:border-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {theme === 'dark' ? (
            <Moon className="w-5 h-5 text-[#E7C36E]" />
          ) : (
            <Sun className="w-5 h-5 text-amber-500" />
          )}
          <div>
            <p className="font-medium">Dark mode</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {theme === 'dark' ? 'On' : 'Off'}
            </p>
          </div>
        </div>
        <button
          onClick={toggleTheme}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${theme === 'dark' ? 'bg-[#E7C36E]' : 'bg-gray-300'
            }`}
          aria-label="Toggle dark mode"
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`}
          />
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
