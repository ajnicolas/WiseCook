import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import Home from './pages/Home'; 
import Recipes from './pages/Recipes';
import Navbar from './navigation/Navbar';
import './App.css';

function App() {
  const [user, setUser] = useState({});

  const handleSignOut = () => {
    setUser({});
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        {user && Object.keys(user).length > 0 && <Navbar user={user} handleSignOut={handleSignOut} />}

        {/* Routes */}
        <Routes>
          <Route
            path="/login"
            element={<Login setUser={setUser} />}
          />
          {/* PrivateRoute for Home */}
          <Route
            path="/home"
            element={
              user && Object.keys(user).length > 0 ? (
                <Home user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* PrivateRoute for Recipes */}
          <Route
            path="/recipes"
            element={
              user && Object.keys(user).length > 0 ? (
                <Recipes user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Default Redirect */}
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
