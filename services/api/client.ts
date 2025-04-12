import { API_CONFIG } from './config';

export const apiClient = {
    //async get(endpoint: string, params[])
  async get(endpoint: string, userLogin?: string) {
    // const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}?login=${userLogin}`, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
        // body: userLogin ? JSON.stringify(userLogin) : "",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  async post(endpoint: string, data: any) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};