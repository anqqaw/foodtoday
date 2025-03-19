import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DinnersView from './components/DinnersView';
import LoginView from './components/LoginView';
import DinnerDetails from './components/DinnerDetails';
import DinnerList from './components/DinnerList';
import ShoppingList from './components/ShoppingList';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('googleAuthToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />

        <Route element={<Layout />}>
          <Route path="/" element={isAuthenticated ? <DinnersView /> : <Navigate to="/login" />} />
          <Route path="/dinner/:id" element={<DinnerDetails />} />
          <Route path="/dinners" element={<DinnerList />} />
          <Route path="/shoppinglist" element={<ShoppingList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
