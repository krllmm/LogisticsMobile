import { API_CONFIG } from './config';
import { Platform } from 'react-native';

// export const API_CONFIG = Platform.OS === 'web' ? API_CONFIG_WEB : API_CONFIG_EXPO;

export const apiClient = {
  async get(endpoint: string, params: any){
    let url = `${API_CONFIG.BASE_URL}${endpoint}`;
    for (const property in params) {
      url += `?${property}=${params[property]}`
    }
    console.log(url)
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });
      
      if (!response.ok) {
        const data = await response.json();
        return data.error; 
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
        const data = await response.json();
        return data.error; 
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};