import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import 'boxicons';

function Logout({ setAuth }) {
  const [showPopup, setShowPopup] = useState(false);
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem('auth');
    navigate('/login');
  };

  return (
    <div className={`h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-md`}>
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Logout</h1>
        <div className="flex justify-center">
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-200"
          >
            <box-icon name='log-out' type='solid' color="white"></box-icon>
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center"
          >
            <h2 className="text-xl font-bold mb-4">Are you sure you want to logout?</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Logout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Logout;