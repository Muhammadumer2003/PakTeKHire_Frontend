// 

import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../store/auth-slice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8008/user/login',
        { email, password },
        { withCredentials: true }
      );

      const data = response.data;
      dispatch(login(data));

      const role = data?.role;

      if (role === 'Freelancer') {
        navigate('/find-work');
      } else if (role === 'client') {
        navigate('/client/dashboard');
      } else {
        setError('Unknown role');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 font-inter">
      {/* Header with logo */}
      {/* <div className="w-full py-6 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-2xl font-bold text-green-500 cursor-pointer">
            Pak<span className="text-gray-800">TekHire.com</span>
          </div>
        </div>
      </div> */}

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-grow w-full px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Log in to PakTekHire
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md">
              {error}
            </div>
          )}
          
          {/* Social login buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="w-full py-2.5 px-4 border border-gray-300 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
            <button className="w-full py-2.5 px-4 border border-gray-300 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
              </svg>
              Continue with Facebook
            </button>
            <button className="w-full py-2.5 px-4 border border-gray-300 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.3 5.71a9.98 9.98 0 00-7.17-3.12c-5.06 0-9.27 3.77-9.94 8.73-.82 5.85 3.15 11.23 8.98 12.16 4.91.79 9.33-1.55 11.6-5.4l-4.11-2.37c-1.35 2.09-3.87 3.25-6.5 2.92-3.18-.4-5.65-3.06-5.78-6.26-.16-3.92 3-7.28 6.9-7.28 1.88 0 3.58.74 4.84 1.94l-3.21 1.84h6.76V2.92l-2.37 2.79z"/>
              </svg>
              Continue with Apple
            </button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center mb-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            
            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Keep me logged in
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="text-green-600 hover:text-green-500">
                  Forgot Password?
                </a>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
            >
              Log In
            </button>
          </form>
          
          <div className="mt-6 text-center text-gray-600">
            <p>
              Don't have a PakTekHire account?{' '}
              <a href="/join" className="text-green-600 hover:underline font-medium">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="w-full py-6 text-center text-sm text-gray-500 border-t border-gray-200 mt-12">
        <p>© 2023 PakTekHire® Global Inc.</p>
      </div>
    </div>
  );
};

export default Login;