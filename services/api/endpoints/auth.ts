import { apiClient } from '../client';

type CredentialsProps = {
    login: string,
    password: string,
}

type userDataProps = {
    login: string
}

export const authService = {
  async login(credentials: CredentialsProps) {
    return apiClient.post('/login', credentials);
  },

  async register(userData: userDataProps) {
    return apiClient.post('/register', userData);
  },

  async getDeliveries(userData: userDataProps) {
    return apiClient.get('/getDeliveries', userData);
  },

  async getCurrentDriver(userData: userDataProps) {
    return apiClient.get('/driver', userData);
  }
};