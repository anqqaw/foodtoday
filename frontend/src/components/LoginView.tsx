import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const ENDPOINT = import.meta.env.VITE_ENDPOINT || 'http://localhost:9000';

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
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Login with Google</h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginView;
