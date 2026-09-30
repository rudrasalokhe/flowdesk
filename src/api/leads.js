import apiClient from './client';
import { MOCK_LEADS, MOCK_LEAD_ACTIVITIES } from '../mock/mockData';

/**
 * Leads API Service
 * Interacts with FastAPI backend for lead management.
 * No business calculations or scoring logic are implemented here.
 */

export const getLeads = async (params = {}) => {
  try {
    const response = await apiClient.get('/leads', { params });
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_LEADS) {
      // Filter mock leads based on query params for smooth UI preview
      let filtered = [...MOCK_LEADS];
      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(l =>
          l.name.toLowerCase().includes(query) ||
          l.company.toLowerCase().includes(query) ||
          l.email.toLowerCase().includes(query)
        );
      }
      if (params.status && params.status !== 'ALL') {
        filtered = filtered.filter(l => l.status.toUpperCase() === params.status.toUpperCase());
      }
      if (params.priority && params.priority !== 'ALL') {
        filtered = filtered.filter(l => l.priority.toUpperCase() === params.priority.toUpperCase());
      }
      if (params.source && params.source !== 'ALL') {
        filtered = filtered.filter(l => l.source.toLowerCase() === params.source.toLowerCase());
      }
      return {
        items: filtered,
        total: filtered.length,
        page: params.page || 1,
        limit: params.limit || 20
      };
    }
    throw error;
  }
};

export const getLead = async (id) => {
  try {
    const response = await apiClient.get(`/leads/${id}`);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_LEADS) {
      const lead = MOCK_LEADS.find(l => String(l.id) === String(id)) || MOCK_LEADS[0];
      return lead;
    }
    throw error;
  }
};

export const createLead = async (data) => {
  try {
    const response = await apiClient.post('/leads', data);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_LEADS) {
      const newLead = {
        id: Math.floor(1000 + Math.random() * 9000),
        ...data,
        score: 85,
        priority: 'HIGH',
        status: 'NEW',
        assigned_to: 'Unassigned',
        assigned_to_id: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        score_factors: ['+20 Domain verified', '+25 Web request submitted']
      };
      return newLead;
    }
    throw error;
  }
};

export const updateLead = async (id, data) => {
  try {
    const response = await apiClient.patch(`/leads/${id}`, data);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_LEADS) {
      const existing = MOCK_LEADS.find(l => String(l.id) === String(id)) || MOCK_LEADS[0];
      return { ...existing, ...data, updated_at: new Date().toISOString() };
    }
    throw error;
  }
};

export const deleteLead = async (id) => {
  try {
    const response = await apiClient.delete(`/leads/${id}`);
    return response.data;
  } catch (error) {
    if (!error.response) {
      return { success: true, message: `Lead #${id} deleted` };
    }
    throw error;
  }
};

export const assignLead = async (id, userId) => {
  try {
    const response = await apiClient.post(`/leads/${id}/assign`, { user_id: userId });
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_LEADS) {
      const lead = MOCK_LEADS.find(l => String(l.id) === String(id)) || MOCK_LEADS[0];
      return {
        ...lead,
        assigned_to_id: userId,
        assigned_to: userId === 1 ? 'Aarav Shah' : userId === 2 ? 'Elena Rostova' : 'Marcus Vance',
        updated_at: new Date().toISOString()
      };
    }
    throw error;
  }
};

export const convertLead = async (id) => {
  try {
    const response = await apiClient.post(`/leads/${id}/convert`);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_LEADS) {
      const lead = MOCK_LEADS.find(l => String(l.id) === String(id)) || MOCK_LEADS[0];
      return {
        ...lead,
        status: 'WON',
        updated_at: new Date().toISOString()
      };
    }
    throw error;
  }
};

export const getLeadActivity = async (id) => {
  try {
    const response = await apiClient.get(`/leads/${id}/activity`);
    return response.data;
  } catch (error) {
    if (!error.response && MOCK_LEAD_ACTIVITIES) {
      return MOCK_LEAD_ACTIVITIES[id] || MOCK_LEAD_ACTIVITIES[1024];
    }
    throw error;
  }
};
