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
    return apiClient.post('/auth/login', credentials);
  },

  async register(userData: userDataProps) {
    return apiClient.post('/auth/register', userData);
  },

  async getCurrentUser() {
    return apiClient.get('/auth/me');
  }
};