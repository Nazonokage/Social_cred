import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute'; // Ensure this component exists
import './index.css';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <Helmet>
          <title>Social Credit System</title>
          <meta name="description" content="A secure social credit system" />
          <meta httpEquiv="Content-Security-Policy" content=" script-src 'self'; style-src 'self'; img-src 'self'; media-src 'self';" />
          <meta httpEquiv="X-Frame-Options" content="DENY" />
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="Referrer-Policy" content="no-referrer" />
          <meta httpEquiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()" />
        </Helmet>
        <Router basename="/social_cred">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
