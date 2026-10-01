// API Client for GadiBazar Backend
// This service handles all API communication with the backend

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api/v1';

interface ApiResponse<T = any> {
  success: boolean;
   T;
  error?: string;
  message?: string;
}

class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearAuth() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request<T>(`${endpoint}${queryString}`, { method: 'GET' });
  }

  async post<T>(endpoint: string,  any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string,  any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

// API endpoints
export const api = {
  auth: {
    login: (email: string, password: string) => apiClient.post('/auth/login', { email, password }),
    register: ( any) => apiClient.post('/auth/register', data),
    logout: () => apiClient.post('/auth/logout', {}),
    getMe: () => apiClient.get('/auth/me'),
  },
  vehicles: {
    getAll: (params?: any) => apiClient.get('/vehicles', params),
    getById: (id: string) => apiClient.get(`/vehicles/${id}`),
    create: ( any) => apiClient.post('/vehicles', data),
    update: (id: string,  any) => apiClient.put(`/vehicles/${id}`, data),
    delete: (id: string) => apiClient.delete(`/vehicles/${id}`),
  },
  listings: {
    getAll: (params?: any) => apiClient.get('/listings', params),
    getById: (id: string) => apiClient.get(`/listings/${id}`),
    create: ( any) => apiClient.post('/listings', data),
    update: (id: string,  any) => apiClient.put(`/listings/${id}`, data),
    delete: (id: string) => apiClient.delete(`/listings/${id}`),
  },
  inspections: {
    getAll: (params?: any) => apiClient.get('/inspections', params),
    getById: (id: string) => apiClient.get(`/inspections/${id}`),
    create: ( any) => apiClient.post('/inspections', data),
  },
  passports: {
    getByPassportId: (passportId: string) => apiClient.get(`/passports/${passportId}`),
    getByVehicleId: (vehicleId: string) => apiClient.get(`/passports/vehicle/${vehicleId}`),
  },
  offers: {
    create: ( any) => apiClient.post('/offers', data),
    update: (id: string,  any) => apiClient.put(`/offers/${id}`, data),
  },
  payments: {
    create: ( any) => apiClient.post('/payments', data),
    getByUser: () => apiClient.get('/payments/user/my-payments'),
  },
};

export default api;
