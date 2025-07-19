// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users`,
  PROFILE: `${API_BASE_URL}/users/profile`,
  PROJECTS: `${API_BASE_URL}/projects`,
  TASKS: `${API_BASE_URL}/tasks`,
  USERS: `${API_BASE_URL}/users`,
};

export default API_BASE_URL; 