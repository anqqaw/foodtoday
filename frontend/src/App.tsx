import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DinnersView from './components/DinnersView';
import LoginView from './components/LoginView';

import './App.css';

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
