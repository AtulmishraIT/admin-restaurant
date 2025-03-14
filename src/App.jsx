import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DarkModeProvider, useDarkMode } from './context/DarkModeContext';
import Home from './components/Home';
import Navbar from './components/Navbar';
import 'boxicons';
import AddFood from './components/Manage/AddFood';
import DeleteFood from './components/Manage/DeleteFood';
import UpdateFood from './components/Manage/UpdateFood';
import Users from './components/Users';
import Orders from './components/orders';
import Setting from './components/Setting';
import Login from './components/Login';
import Logout from './components/Logout';
import './App.css';

function AppContent({ auth, setAuth }) {
  const { darkMode } = useDarkMode();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={`App ${darkMode ? '*:bg-gray-900 *:text-gray-400' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<AddFood />} />
        <Route path='/delete' element={<DeleteFood />} />
        <Route path='/update' element={<UpdateFood />} />
        <Route path='/users' element={<Users />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/login' element={<Login setAuth={setAuth} />} />
        <Route path='/logout' element={<Logout setAuth={setAuth} />} />
      </Routes>
    </div>
  );
}

function App() {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem('auth');
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login setAuth={setAuth} />} />
          <Route path='/*' element={<AppContent auth={auth} setAuth={setAuth} />} />
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;