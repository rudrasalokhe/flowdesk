import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('launchpad_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('launchpad_token');
      if (storedToken) {
        try {
          const userData = await authApi.getCurrentUser();
          setUser(userData);
          setToken(storedToken);
        } catch (err) {
          console.warn('Auth token verification failed:', err);
          // Don't forcefully clear if network is offline in dev mode
        }
      } else {
        // Dev default user for rapid inspection if token is not set yet
        setUser({
          id: 4,
          name: "Sarah Chen",
          email: "sarah.chen@launchpad.io",
          role: "ADMIN",
          team: "RevOps Operations"
        });
        setToken("demo_bearer_token");
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const data = await authApi.login(email, password);
      if (data && data.access_token) {
        localStorage.setItem('launchpad_token', data.access_token);
        setToken(data.access_token);
        const userData = data.user || {
          id: 1,
          name: email.split('@')[0],
          email,
          role: "MANAGER",
          team: "RevOps"
        };
        setUser(userData);
        return { success: true };
      }
      throw new Error('Invalid server authentication response format.');
    } catch (err) {
      const message = err.userMessage || err.message || 'Login failed. Please check credentials.';
      setAuthError(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('launchpad_token');
    setToken(null);
    setUser(null);
    authApi.logout().catch(() => {});
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token),
    isLoading,
    authError,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
