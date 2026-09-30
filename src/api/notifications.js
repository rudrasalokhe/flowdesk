import apiClient from './client';
import { MOCK_NOTIFICATIONS } from '../mock/mockData';

/**
 * Notifications API Service
 * Expected endpoints: GET /notifications, PATCH /notifications/{id}/read
 */

export const getNotifications = async () => {
  try {
    const response = await apiClient.get('/notifications');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_NOTIFICATIONS) {
      return MOCK_NOTIFICATIONS;
    }
    throw error;
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await apiClient.patch(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_NOTIFICATIONS) {
      const item = MOCK_NOTIFICATIONS.find(n => String(n.id) === String(id));
      if (item) item.read = true;
      return { success: true };
    }
    throw error;
  }
};

export const markAllAsRead = async () => {
  try {
    const response = await apiClient.patch('/notifications/read-all');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_NOTIFICATIONS) {
      MOCK_NOTIFICATIONS.forEach(n => { n.read = true; });
      return { success: true };
    }
    throw error;
  }
};
