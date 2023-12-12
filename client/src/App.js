import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login'; 
import Home from './pages/Home'; 
import Recipes from './pages/Recipes';
import Navbar from './navigation/Navbar';
import './App.css';

const PrivateRoute = ({ element, user }) => {
  // Check if the user is authenticated (not empty)
  if (user && Object.keys(user).length > 0) {
    return element; // Return the provided element if the user is authenticated
  } else {
    // Redirect to the login page if the user is empty
    return <Navigate to="/login" />;
  }
};

function App() {
  const [user, setUser] = useState({});

  const handleSignOut = () => {
    setUser({});
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route
            path="/home"
            element={<PrivateRoute element={<Home user={user} setUser={setUser} />} user={user} />}
          />
          <Route
            path="/recipes"
            element={<PrivateRoute element={<Recipes user={user} setUser={setUser} />} user={user} />}
          />
          {user && Object.keys(user).length > 0 && <Navbar user={user} handleSignOut={handleSignOut} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
