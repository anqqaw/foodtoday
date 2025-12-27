import { Outlet } from 'react-router-dom';
import BottomNavBar from './BottomNavBar';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-auto pb-20">
        <Outlet />
      </div>
      <BottomNavBar />
    </div >
  );
}

export default Layout;
