import apiClient from './client';
import { MOCK_IMPORTS } from '../mock/mockData';

/**
 * CSV Import API Service
 * Interacts with FastAPI backend for asynchronous CSV file uploads and status polling.
 * Frontend does NOT parse or validate CSV content.
 */

export const uploadCsv = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/imports/leads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_IMPORTS) {
      const newJobId = `job_${Math.floor(100 + Math.random() * 900)}`;
      return {
        id: newJobId,
        file_name: file.name,
        file_size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploaded_at: new Date().toISOString(),
        status: 'PROCESSING',
        total_rows: 50000,
        processed_rows: 12500,
        imported_rows: 11800,
        duplicate_rows: 450,
        invalid_rows: 250,
        progress_percentage: 25.0,
        errors: [
          { row: 42, field: "email", message: "Malformed domain syntax" },
          { row: 189, field: "phone", message: "Invalid length" }
        ]
      };
    }
    throw error;
  }
};

export const getImportStatus = async (id) => {
  try {
    const response = await apiClient.get(`/imports/${id}`);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_IMPORTS) {
      const statusObj = MOCK_IMPORTS[id] || MOCK_IMPORTS.job_101;
      return statusObj;
    }
    throw error;
  }
};
