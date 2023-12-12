import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import Home from './pages/Home'; 
import Recipes from './pages/Recipes';
import Navbar from './navigation/Navbar';
import './App.css';

// PrivateRoute component for protected routes
const PrivateRoute = ({ element: Element, user, ...rest }) => {
  return (
    <Route
      {...rest}
      element={user ? <Element /> : <Navigate to="/login" />}
    />
  );
};

function App() {
  const [user, setUser] = useState({});

  const handleSignOut = () => {
    setUser({});
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} handleSignOut={handleSignOut} />
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <PrivateRoute
            path="/home"
            element={<Home user={user} setUser={setUser} handleSignOut={handleSignOut} />}
          />
          <PrivateRoute
            path="/recipes"
            element={<Recipes user={user} setUser={setUser} handleSignOut={handleSignOut} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
