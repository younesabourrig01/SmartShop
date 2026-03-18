import API from "./client";

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

export const registerUser = (data: object | FormData) => {
  return API.post("/register", data);
};

export const login = (data: object) => {
  return API.post("/login", data);
};

export const logout = () => {
  return API.post("/logout");
};
