import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import './LoginView.css';

const ENDPOINT = process.env.REACT_APP_API_URL || 'http://localhost:9000';

const LoginView: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('googleAuthToken');
    if (token) {
      axios.get(`${ENDPOINT}/api/dinners`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        navigate('/');
      })
      .catch(() => {
        // Token is invalid or request failed, stay on the login page
      });
    }
  }, [navigate]);

  const handleLoginSuccess = (response: any) => {
    const token = response.credential;
    localStorage.setItem('googleAuthToken', token);
    navigate('/');
  };

  const handleLoginFailure = () => {
    console.error('Login failed');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || '296278558628-lf8ia7krfo08jo4m8esl3o5cj4hud76p.apps.googleusercontent.com'}>
      <div className="login-container">
        <h2 className="login-title">Login with Google</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginView;
