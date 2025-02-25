import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DinnersView from './components/DinnersView';
import LoginView from './components/LoginView';
import DinnerDetails from './components/DinnerDetails';
import DinnerList from './components/DinnerList';

import './App.css';
import BottomNavBar from './components/BottomNavBar';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('googleAuthToken');

    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={isAuthenticated ? <DinnersView /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/dinner/:id" element={<DinnerDetails />} />
          <Route path='/dinners' element={<DinnerList />} />
        </Routes>

        <BottomNavBar />
      </div>
    </Router>
  );
};

export default App;
