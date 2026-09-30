import apiClient from './client';
import { MOCK_USERS } from '../mock/mockData';

/**
 * Authentication API Service
 * FastAPI Expected endpoint: POST /auth/login
 * Expected response: { "access_token": "...", "token_type": "bearer" }
 */

export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    // If backend isn't reachable during initial UI dev, provide dev fallback login
    if (!error.response && MOCK_USERS) {
      const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || MOCK_USERS[0];
      return {
        access_token: `mock_jwt_token_user_${foundUser.id}`,
        token_type: 'bearer',
        user: foundUser
      };
    }
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get('/auth/me');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_USERS) {
      return MOCK_USERS[3]; // Default Admin user for demo mode
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  } catch (error) {
    return { success: true };
  }
};
