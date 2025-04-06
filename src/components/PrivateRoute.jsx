import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import api from '../services/api';

export default function PrivateRoute() {
  const { user, setUser, debts, fetchDebts } = useUser();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthChecked(true);
        return;
      }

      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const userResponse = await api.get('/auth/me');
        setUser(userResponse.data);
        // console.log(setUser);
        await fetchDebts(); // Wait for debts to load
        
      } catch (err) {
        console.error('Auth error:', err);
        localStorage.removeItem('token');
      } finally {
        setIsAuthChecked(true);
      }
    };

    verifyAuth();
  }, [setUser, fetchDebts]);

  // If auth check is not complete, show loading
  if (!isAuthChecked) {
    return <div>Loading...</div>;
  }

  // If no token or user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If auth is complete and user exists, render children
  return <Outlet />;
}