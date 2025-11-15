import axios, { AxiosInstance } from 'axios'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.aliasauto.kr/api/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async getCollections(params?: { page?: number; limit?: number }) {
    try {
      const response = await this.client.get('/public/collections', { params })
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch collections:', error)
      throw error
    }
  }

  async getCollection(id: string | number) {
    try {
      const response = await this.client.get(`/public/collections/${id}`)
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch collection:', error)
      throw error
    }
  }

  async getInspection(id: string | number) {
    try {
      const response = await this.client.get(`/public/inspections/${id}`)
      return response.data.data
    } catch (error) {
      console.error('Failed to fetch inspection:', error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()

