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

export const deleteAccount = (data: { password?: string }) => {
  return API.delete("/deleteAccount", { data });
};

export const updateProfile = (data: FormData) => {
  return API.post("/updateProfile", data, {
    params: { _method: "PATCH" },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getAllUsers = (page: number = 1) => {
  return API.get(`/users?page=${page}`);
};

export const getBadge = () => {
  return API.get("/badge");
};

