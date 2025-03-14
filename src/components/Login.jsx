import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import 'boxicons';

function Login({ setAuth }) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace with your actual admin ID and password
    const validAdminId = 'atul';
    const validPassword = 'am302004';

    if (adminId === validAdminId && password === validPassword) {
      setAuth(true);
      navigate('/');
    } else {
      alert('Invalid admin ID or password');
    }
  };

  return (
    <div className={`h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-md`}>
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="adminId" className="block font-medium mb-2">Admin ID</label>
            <div className="relative flex content-center">
              <p className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><box-icon name='user' type='solid'></box-icon></p>
              <input
                type="text"
                id="adminId"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block font-medium mb-2">Password</label>
            <div className="relative flex content-center">
              <p className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"><box-icon name='lock-alt' type='solid' ></box-icon></p>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;