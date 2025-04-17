import { apiClient } from '../client';

type productProps = {
    id: string
}

export const itemService = {
  async getProduct(product: productProps) {
    return apiClient.get('/getProduct', product);
  }
};