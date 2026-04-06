import { Outlet } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Layout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors">
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-[#E7C36E] hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>
      <BottomNavBar />
    </div >
  );
}

export default Layout;
