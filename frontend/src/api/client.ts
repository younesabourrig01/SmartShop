import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Accept": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const API_BASE_URL = "http://127.0.0.1:8000";

export const getImageUrl = (path?: string | null) => {
  if (!path) return "/placeholder.svg"; // Fallback to a placeholder
  if (path.startsWith('http')) return path;
  
  // Ensure we don't have double slashes and starting with storage
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath.startsWith('/storage/')) {
    return `${API_BASE_URL}${cleanPath}`;
  }
  
  return `${API_BASE_URL}/storage${cleanPath}`;
};

export default API;