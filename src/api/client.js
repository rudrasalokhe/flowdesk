import axios from 'axios';
import { apiLogger } from '../utils/apiLogger';

// Dedicated API Base URL configuration from environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Centralized Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000
});

// Request Interceptor: Automatically attach Bearer Token if available & mark start time
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('launchpad_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.metadata = { startTime: new Date() };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Format error messages & log to live API Inspector
apiClient.interceptors.response.use(
  (response) => {
    const duration = new Date() - (response.config.metadata?.startTime || new Date());
    
    // Log successful REST request for interview inspector
    apiLogger.logRequest({
      method: response.config.method,
      url: response.config.url,
      headers: response.config.headers,
      body: response.config.data ? JSON.parse(response.config.data) : null,
      status: response.status,
      response: response.data,
      duration,
      isMock: false
    });

    return response;
  },
  (error) => {
    const duration = error.config?.metadata ? new Date() - error.config.metadata.startTime : 35;
    let userMessage = 'An unexpected error occurred. Please try again.';
    let status = 500;

    if (error.response) {
      status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          userMessage = data?.detail || data?.message || 'Bad request. Please check input parameters.';
          break;
        case 401:
          userMessage = 'Session expired or unauthorized. Please log in again.';
          break;
        case 403:
          userMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          userMessage = 'The requested resource was not found.';
          break;
        case 409:
          userMessage = 'Conflict: This lead or resource already exists.';
          break;
        case 422:
          userMessage = 'Validation error: Please check the submitted information.';
          if (Array.isArray(data?.detail)) {
            userMessage += ' ' + data.detail.map(err => `${err.loc?.join('.')}: ${err.msg}`).join(', ');
          }
          break;
        case 429:
          userMessage = 'Too many requests. Rate limit exceeded. Please try again later.';
          break;
        case 500:
        default:
          userMessage = 'Internal server error. Something went wrong on the backend. Please retry.';
          break;
      }

      // Log error response to Inspector
      apiLogger.logRequest({
        method: error.config?.method || 'GET',
        url: error.config?.url || '/api',
        headers: error.config?.headers || {},
        body: error.config?.data ? JSON.parse(error.config.data) : null,
        status,
        response: data || { error: userMessage },
        duration,
        isMock: false
      });
    } else if (error.request) {
      userMessage = `Unable to connect to backend at ${API_BASE_URL}. Running in Isolated Mock Mode.`;
      
      // Log network offline / mock fallback to Inspector
      apiLogger.logRequest({
        method: error.config?.method || 'GET',
        url: error.config?.url || '/api',
        headers: error.config?.headers || {},
        body: error.config?.data ? (typeof error.config.data === 'string' ? JSON.parse(error.config.data) : error.config.data) : null,
        status: 200,
        response: { note: "FastAPI offline. Handled by isolated mock layer." },
        duration,
        isMock: true
      });
    }

    error.userMessage = userMessage;
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };
