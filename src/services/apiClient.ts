// API Client for GadiBazar Backend
// This service handles all API communication with the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

interface ApiResponse<T = any> {
  success: boolean;
   T;
  error?: string;
  message?: string;
}

interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

class ApiClient {
  private token: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    // Load tokens from localStorage
    this.token = localStorage.getItem('auth_token');
    this.refreshToken = localStorage.getItem('refresh_token');
  }

  // Set authentication token
  setToken(token: string, refreshToken?: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
    
    if (refreshToken) {
      this.refreshToken = refreshToken;
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  // Clear authentication
  clearAuth() {
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }

  // Check if authenticated
  isAuthenticated(): boolean {
    return !!this.token;
  }

  // Get authorization headers
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Handle API errors
  private async handleError(response: Response): Promise<never> {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    
    // Handle token expiration
    if (response.status === 401) {
      // Try to refresh token
      if (this.refreshToken) {
        const refreshed = await this.refreshAuthToken();
        if (refreshed) {
          throw new Error('Token refreshed, please retry the request');
        }
      }
      
      // Clear auth and redirect to login
      this.clearAuth();
      window.location.href = '/login';
    }

    throw new Error(error.error || error.message || 'API request failed');
  }

  // Refresh authentication token
  private async refreshAuthToken(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: this.refreshToken }),
      });

      if (!response.ok) {
        return false;
      }

      const  { token, refreshToken } = await response.json();
      this.setToken(token, refreshToken);
      return true;
    } catch (error) {
      return false;
    }
  }

  // Generic request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      await this.handleError(response);
    }

    const data = await response.json();
    return data;
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
    return this.request<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  }

  // POST request
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT request
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // PATCH request
  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export API methods
export const api = {
  // Auth
  auth: {
    register: (data: any) => apiClient.post('/auth/register', data),
    login: (data: any) => apiClient.post('/auth/login', data),
    logout: () => apiClient.post('/auth/logout', {}),
    getMe: () => apiClient.get('/auth/me'),
    changePassword: (data: any) => apiClient.put('/auth/change-password', data),
  },

  // Users
  users: {
    getAll: (params?: any) => apiClient.get('/users', params),
    getById: (id: string) => apiClient.get(`/users/${id}`),
    update: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
    updateRole: (id: string, role: string) => apiClient.put(`/users/${id}/role`, { role }),
    delete: (id: string) => apiClient.delete(`/users/${id}`),
  },

  // Vehicles
  vehicles: {
    getAll: (params?: any) => apiClient.get('/vehicles', params),
    getById: (id: string) => apiClient.get(`/vehicles/${id}`),
    getByPassportId: (passportId: string) => apiClient.get(`/vehicles/passport/${passportId}`),
    create: (data: any) => apiClient.post('/vehicles', data),
    update: (id: string, data: any) => apiClient.put(`/vehicles/${id}`, data),
    delete: (id: string) => apiClient.delete(`/vehicles/${id}`),
  },

  // Listings
  listings: {
    getAll: (params?: any) => apiClient.get('/listings', params),
    getById: (id: string) => apiClient.get(`/listings/${id}`),
    getMyListings: (params?: any) => apiClient.get('/listings/seller/my-listings', params),
    create: (data: any) => apiClient.post('/listings', data),
    update: (id: string, data: any) => apiClient.put(`/listings/${id}`, data),
    delete: (id: string) => apiClient.delete(`/listings/${id}`),
    markAsSold: (id: string) => apiClient.post(`/listings/${id}/sold`, {}),
  },

  // Inspections
  inspections: {
    getAll: (params?: any) => apiClient.get('/inspections', params),
    getById: (id: string) => apiClient.get(`/inspections/${id}`),
    getMyInspections: (params?: any) => apiClient.get('/inspections/inspector/my-inspections', params),
    create: (data: any) => apiClient.post('/inspections', data),
    update: (id: string, data: any) => apiClient.put(`/inspections/${id}`, data),
  },

  // Passports
  passports: {
    getAll: (params?: any) => apiClient.get('/passports', params),
    getByPassportId: (passportId: string) => apiClient.get(`/passports/${passportId}`),
    getByVehicleId: (vehicleId: string) => apiClient.get(`/passports/vehicle/${vehicleId}`),
  },

  // Offers
  offers: {
    getAll: (params?: any) => apiClient.get('/offers', params),
    getById: (id: string) => apiClient.get(`/offers/${id}`),
    getMyOffers: (params?: any) => apiClient.get('/offers/buyer/my-offers', params),
    getReceivedOffers: (params?: any) => apiClient.get('/offers/seller/received-offers', params),
    create: (data: any) => apiClient.post('/offers', data),
    update: (id: string, data: any) => apiClient.put(`/offers/${id}`, data),
  },

  // Reservations
  reservations: {
    getAll: (params?: any) => apiClient.get('/reservations', params),
    getById: (id: string) => apiClient.get(`/reservations/${id}`),
    getMyReservations: (params?: any) => apiClient.get('/reservations/buyer/my-reservations', params),
    create: (data: any) => apiClient.post('/reservations', data),
    update: (id: string, data: any) => apiClient.put(`/reservations/${id}`, data),
  },

  // Payments
  payments: {
    getAll: (params?: any) => apiClient.get('/payments', params),
    getById: (id: string) => apiClient.get(`/payments/${id}`),
    getMyPayments: (params?: any) => apiClient.get('/payments/user/my-payments', params),
    create: (data: any) => apiClient.post('/payments', data),
  },

  // Dealers
  dealers: {
    getAll: (params?: any) => apiClient.get('/dealers', params),
    getById: (id: string) => apiClient.get(`/dealers/${id}`),
    getInventory: (id: string, params?: any) => apiClient.get(`/dealers/${id}/inventory`, params),
    create: (data: any) => apiClient.post('/dealers', data),
    update: (id: string, data: any) => apiClient.put(`/dealers/${id}`, data),
  },

  // Messages
  messages: {
    getConversations: () => apiClient.get('/messages/conversations'),
    getMessages: (conversationId: string, params?: any) => 
      apiClient.get(`/messages/conversations/${conversationId}`, params),
    send: (data: any) => apiClient.post('/messages/send', data),
    markAsRead: (id: string) => apiClient.put(`/messages/messages/${id}/read`, {}),
  },

  // Notifications
  notifications: {
    getAll: (params?: any) => apiClient.get('/notifications', params),
    markAsRead: (id: string) => apiClient.put(`/notifications/${id}/read`, {}),
    markAllAsRead: () => apiClient.put('/notifications/mark-all-read', {}),
    getUnreadCount: () => apiClient.get('/notifications/unread-count'),
  },

  // Search
  search: {
    search: (params: any) => apiClient.get('/search', params),
    getSuggestions: (q: string) => apiClient.get('/search/suggestions', { q }),
  },
};

export default api;
