import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';

function Setting() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    // Apply dark mode class to the body element
    if (darkMode) {
      document.body.classList.add('bg-gray-900', 'text-white');
    } else {
      document.body.classList.remove('bg-gray-900', 'text-white');
    }
  }, [darkMode]);

  return (
    <div className={`ml-20 max-sm:ml-0 ${darkMode ? '*:bg-gray-900 *:text-white' : 'bg-gray-100 text-gray-900'} h-screen p-4`}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-4"
      >
        Settings
      </motion.h1>
      <div className={`bg-white ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} p-6 shadow rounded-lg max-w-2xl mx-auto`}>
        <h2 className="text-xl font-semibold mb-4">Preferences</h2>
        <div className="flex items-center">
          <label htmlFor="darkMode" className="font-medium mr-4">
            Dark Mode
          </label>
          <div
            className={`relative inline-block w-12 h-6 transition duration-200 ease-linear ${
              darkMode ? 'bg-green-600' : 'bg-gray-300'
            } rounded-full`}
            onClick={toggleDarkMode}
          >
            <span
              className={`absolute left-0 inline-block w-6 h-6 transform transition duration-100 ease-linear rounded-full bg-white ${
                darkMode ? 'translate-x-full bg-white' : 'translate-x-0 bg-white'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;