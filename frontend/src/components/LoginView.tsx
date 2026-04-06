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
      <div className="flex min-h-screen bg-amber-50 dark:bg-black transition-colors">

        {/* Left panel - branding */}
        <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-amber-500 dark:bg-[#1a1a1a] px-12 text-white">
          <div className="max-w-xs text-center">
            <div className="text-7xl mb-6">🍽️</div>
            <h1 className="text-4xl font-black tracking-tight mb-3">FoodToday</h1>
            <p className="text-amber-100 dark:text-gray-400 text-lg leading-relaxed">
              Discover what to cook today. Swipe through recipes, build your shopping list.
            </p>
          </div>
        </div>

        {/* Right panel - form */}
        <div className="flex flex-col justify-center items-center w-full md:w-1/2 px-6 py-12">
          {/* Mobile logo */}
          <div className="md:hidden text-center mb-8">
            <div className="text-5xl mb-2">🍽️</div>
            <h1 className="text-3xl font-black text-amber-500 tracking-tight">FoodToday</h1>
          </div>

          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {isRegistering ? 'Luo tili' : 'Tervetuloa takaisin'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              {isRegistering ? 'Rekisteröidy aloittaaksesi' : 'Kirjaudu jatkaaksesi'}
            </p>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Sähköposti
                </label>
                <input
                  type="email"
                  placeholder="sinä@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-amber-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Salasana
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-amber-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:focus:ring-amber-600 transition-all"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-semibold transition-all duration-150 shadow-md"
              >
                {isRegistering ? 'Rekisteröidy' : 'Kirjaudu sisään'}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              <span className="text-xs text-gray-400 uppercase tracking-wide">tai</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
              />
            </div>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              {isRegistering ? 'Onko sinulla jo tili?' : 'Ei vielä tiliä?'}{' '}
              <button
                className="text-amber-500 hover:text-amber-600 font-semibold transition-colors"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? 'Kirjaudu tästä' : 'Rekisteröidy tästä'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginView;
