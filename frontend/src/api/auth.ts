import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// token wen login
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const sendOtp = (data: object) => {
  return API.post("/send-otp", data);
};

export const registerUser = (data: object) => {
  return API.post("/register", data);
};

export const login = (data: object) => {
  return API.post("/login", data);
};

export const logout = () => {
  return API.post("/logout");
};
