import apiClient from './client';
import { MOCK_TASKS } from '../mock/mockData';

/**
 * Tasks API Service
 * Interacts with FastAPI backend for follow-up tasks.
 */

export const getTasks = async (params = {}) => {
  try {
    const response = await apiClient.get('/tasks', { params });
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_TASKS) {
      let filtered = [...MOCK_TASKS];
      if (params.status && params.status !== 'ALL') {
        filtered = filtered.filter(t => t.status.toUpperCase() === params.status.toUpperCase());
      }
      return filtered;
    }
    throw error;
  }
};

export const createTask = async (data) => {
  try {
    const response = await apiClient.post('/tasks', data);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_TASKS) {
      const newTask = {
        id: Math.floor(100 + Math.random() * 900),
        ...data,
        status: data.status || 'PENDING'
      };
      return newTask;
    }
    throw error;
  }
};

export const updateTask = async (id, data) => {
  try {
    const response = await apiClient.patch(`/tasks/${id}`, data);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_TASKS) {
      const existing = MOCK_TASKS.find(t => String(t.id) === String(id)) || MOCK_TASKS[0];
      return { ...existing, ...data };
    }
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      return { success: true };
    }
    throw error;
  }
};
