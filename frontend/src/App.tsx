import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import VotingView from './components/VotingView';
import VoteResults from './components/VoteResults';
import QRCodeView from './components/QRCodeView';
import LoginView from './components/LoginView';

import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('googleAuthToken');
    console.log(token);

    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={isAuthenticated ? <VotingView /> : <Navigate to="/login" />} />
          <Route path="/results" element={isAuthenticated ? <VoteResults /> : <Navigate to="/login" />} />
          <Route path="/code" element={isAuthenticated ? <QRCodeView /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
