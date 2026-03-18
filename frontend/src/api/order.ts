import API from "./client";

export const createOrder = () => {
  return API.post('/order');
};
