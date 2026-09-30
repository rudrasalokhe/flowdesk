import apiClient from './client';
import { MOCK_ANALYTICS } from '../mock/mockData';

/**
 * Analytics API Service
 * Interacts with FastAPI backend for metrics, pipelines, and reporting charts.
 */

export const getOverview = async () => {
  try {
    const response = await apiClient.get('/analytics/overview');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_ANALYTICS) {
      return MOCK_ANALYTICS.overview;
    }
    throw error;
  }
};

export const getLeadsOverTime = async () => {
  try {
    const response = await apiClient.get('/analytics/leads-over-time');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_ANALYTICS) {
      return MOCK_ANALYTICS.leads_over_time;
    }
    throw error;
  }
};

export const getLeadsBySource = async () => {
  try {
    const response = await apiClient.get('/analytics/leads-by-source');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_ANALYTICS) {
      return MOCK_ANALYTICS.leads_by_source;
    }
    throw error;
  }
};

export const getLeadsByStatus = async () => {
  try {
    const response = await apiClient.get('/analytics/leads-by-status');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_ANALYTICS) {
      return MOCK_ANALYTICS.leads_by_status;
    }
    throw error;
  }
};

export const getSalespersonPerformance = async () => {
  try {
    const response = await apiClient.get('/analytics/salesperson-performance');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_ANALYTICS) {
      return MOCK_ANALYTICS.salesperson_performance;
    }
    throw error;
  }
};

export const getPipelineData = async () => {
  try {
    const response = await apiClient.get('/analytics/pipeline');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_ANALYTICS) {
      return MOCK_ANALYTICS.pipeline;
    }
    throw error;
  }
};

export const getScoreDistribution = async () => {
  try {
    const response = await apiClient.get('/analytics/score-distribution');
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_ANALYTICS) {
      return MOCK_ANALYTICS.score_distribution;
    }
    throw error;
  }
};
