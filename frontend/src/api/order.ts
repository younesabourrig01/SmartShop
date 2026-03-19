import API from "./client";

export const createOrder = () => {
  return API.post('/order');
};

export const orderByUser = () => {
    return API.get('/my-orders');
};
