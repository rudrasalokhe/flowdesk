import apiClient from './client';
import { MOCK_USERS } from '../mock/mockData';

/**
 * Team / Users API Service
 * Expected endpoints: GET /users, GET /users/{id}, PATCH /users/{id}
 */

export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_USERS) {
      return MOCK_USERS;
    }
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_USERS) {
      return MOCK_USERS.find(u => String(u.id) === String(id)) || MOCK_USERS[0];
    }
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_USERS) {
      const existing = MOCK_USERS.find(u => String(u.id) === String(id)) || MOCK_USERS[0];
      return { ...existing, ...data };
    }
    throw error;
  }
};
