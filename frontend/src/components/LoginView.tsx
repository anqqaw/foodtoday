import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const ENDPOINT = import.meta.env.VITE_ENDPOINT || 'http://localhost:9000';

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('googleAuthToken');
    if (token) {
      axios.get(`${ENDPOINT}/api/dinners`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          navigate('/');
        })
        .catch(() => { });
    }
  }, [navigate]);

  const handleGoogleLoginSuccess = (response: any) => {
    const token = response.credential;
    localStorage.setItem('googleAuthToken', token);
    navigate('/');
  };

  const handleGoogleLoginFailure = () => {
    console.error('Google login failed');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const path = isRegistering ? '/register' : '/login';
      const res = await axios.post(`${ENDPOINT}/api${path}`, { email, password });

      localStorage.setItem('googleAuthToken', res.data.token);
      navigate('/');
    } catch (err: any) {
      console.error('Auth failed:', err.response?.data || err.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h2 className="text-2xl font-bold mb-4">
          {isRegistering ? 'Rekisteröidy sähköpostilla' : 'Kirjaudu sisään sähköpostilla'}
        </h2>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 w-80">
          <input
            type="email"
            placeholder="Sähköposti"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-black p-2 rounded bg-gray-800 p-6 rounded-xl shadow-md"
          />
          <input
            type="password"
            placeholder="Salasana"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-black p-2 rounded bg-gray-800 p-6 rounded-xl shadow-md"
          />
          <button type="submit" className="bg-white text-black rounded p-2">
            {isRegistering ? 'Rekisteröidy' : 'Kirjaudu'}
          </button>
        </form>

        <p className="mt-4 text-sm">
          <button
            className="underline"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Kirjaudu tästä' : 'Rekisteröidy tästä'}
          </button>
        </p>

        <div className="mt-8">
          <h3 className="text-lg mb-2">Tai kirjaudu Googlella</h3>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginView;
