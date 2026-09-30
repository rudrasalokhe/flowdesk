import axios from 'axios';

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

// Request Interceptor: Automatically attach Bearer Token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('launchpad_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Format error messages according to backend API contracts
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Standardize user-facing error message based on HTTP status code
    let userMessage = 'An unexpected error occurred. Please try again.';

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          userMessage = data?.detail || data?.message || 'Bad request. Please check input parameters.';
          break;
        case 401:
          userMessage = 'Session expired or unauthorized. Please log in again.';
          // Optional: handle auth token expiration clear
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
    } else if (error.request) {
      userMessage = `Unable to connect to backend at ${API_BASE_URL}. Ensure FastAPI is running or view mock mode.`;
    }

    // Attach standardized message to error object
    error.userMessage = userMessage;
    return Promise.reject(error);
  }
);

export default apiClient;
export { API_BASE_URL };
