import { apiClient } from '../client';

type productProps = {
    id: string
}

type closeDeliveryProps = {
  deliveryId: string, 
  driverLogin: string
}

export const itemService = {
  async getProduct(product: productProps) {
    return apiClient.get('/getProduct', product);
  },
  async closeDelivery(credentials: closeDeliveryProps) {
    return apiClient.post("/closeDelivery", credentials)
  },
};