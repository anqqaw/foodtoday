import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const SettingsView: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-amber-50 dark:bg-black text-gray-900 dark:text-white transition-colors">
      {/* Header */}
      <div className="px-6 pt-10 pb-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 dark:text-[#E7C36E] mb-1">App</p>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Settings</h1>
      </div>

      {/* Section */}
      <div className="px-6 mt-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3">Appearance</p>
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-amber-100 dark:border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-gray-800 flex items-center justify-center">
                {theme === 'dark' ? (
                  <Moon className="w-4 h-4 text-[#E7C36E]" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </div>
              <div>
                <p className="font-semibold text-sm">Dark mode</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {theme === 'dark' ? 'On' : 'Off'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${theme === 'dark' ? 'bg-[#E7C36E]' : 'bg-gray-200'
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
      </div>
    </div>
  );
};

export default SettingsView;
