import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Account Management API
export const accountAPI = {
  // Get all accounts (mock data)
  getAccounts: () => api.get('/accounts'),
  
  // Create new Hedera account
  createAccount: () => api.get('/accounts/create'),
  
  // List all created accounts
  listAccounts: () => api.get('/accounts/list'),
};

// Token Management API
export const tokenAPI = {
  // Create tokens from distribution data
  createTokens: () => api.get('/tokens/create'),
  
  // Get all UpEnergy tokens
  getUpEnergyTokens: () => api.get('/tokens/upenergy'),
  
  // Get tokens available for sale
  getMarketTokens: () => api.get('/tokens/market'),
  
  // Sell a token
  sellToken: (tokenId) => api.get(`/tokens/sell?tokenId=${tokenId}`),
  
  // Buy a token
  buyToken: (tokenId, buyerAccount) => 
    api.get(`/tokens/buy?tokenId=${tokenId}&buyerAccount=${buyerAccount}`),
};

// General API
export const generalAPI = {
  // Health check
  healthCheck: () => api.get('/'),
};

export default api;
