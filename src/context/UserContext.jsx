// Update your UserContext.jsx
import { createContext, useState, useContext, useCallback } from 'react';
import api from '../services/api';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [debts, setDebts] = useState(null);
  const [loadingDebts, setLoadingDebts] = useState(false);
  const [debtError, setDebtError] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    api.defaults.headers.common['Authorization'] = null;
    setUser(null);
    setDebts(null);
  }, []);

  const fetchDebts = useCallback(async () => {
    try {
      setLoadingDebts(true);
      const { data } = await api.get('/auth/debts');
      
      const formattedDebts = data.map(debt => {
        let uidString = debt.UID;
        if (debt.UID?.data) {
          uidString = new TextDecoder().decode(new Uint8Array(debt.UID.data));
        }

        const parsedData = typeof debt.Data === 'string' 
          ? JSON.parse(debt.Data) 
          : debt.Data;

        return {
          ...debt,
          UID: uidString,
          Data: parsedData
        };
      });
      
      setDebts(formattedDebts);
      setDebtError(null);
      return formattedDebts;
    } catch (err) {
      console.error('Debt fetch error:', err);
      setDebtError(err.response?.data?.error || err.message);
      if (err.response?.status === 401) logout();
      throw err;
    } finally {
      setLoadingDebts(false);
    }
  }, [logout]);

  const createDebt = useCallback(async (debtData) => {
    try {
      setLoadingDebts(true);
      const { data } = await api.post('/auth/debts', {
        data: debtData
      });
      await fetchDebts();
      return data;
    } catch (err) {
      console.error('Error creating debt:', err);
      throw err;
    } finally {
      setLoadingDebts(false);
    }
  }, [fetchDebts]);

  const updateDebt = useCallback(async (debtId, debtData) => {
    try {
      setLoadingDebts(true);
      const { data } = await api.put(`/auth/debts/${debtId}`, {
        data: debtData
      });
      await fetchDebts();
      return data;
    } catch (err) {
      console.error('Error updating debt:', err);
      throw err;
    } finally {
      setLoadingDebts(false);
    }
  }, [fetchDebts]);

  const deleteDebt = useCallback(async (debtId) => {
    try {
      setLoadingDebts(true);
      await api.delete(`/auth/debts/${debtId}`);
      await fetchDebts();
    } catch (err) {
      console.error('Error deleting debt:', err);
      throw err;
    } finally {
      setLoadingDebts(false);
    }
  }, [fetchDebts]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        debts,
        loadingDebts,
        debtError,
        fetchDebts,
        createDebt,
        updateDebt,
        deleteDebt
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}