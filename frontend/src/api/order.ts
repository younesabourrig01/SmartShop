import API from "./client";

export const createOrder = () => {
  return API.post('/order');
};

export const orderByUser = () => {
    return API.get('/my-orders');
};
export const getAllOrders = () => {
    return API.get('/admin/orders');
};

export const getOrdersByDate = (date: string) => {
    return API.get(`/admin/orders/date/${date}`);
};

export const downloadReport = (date: string) => {
    return API.get(`/admin/orders/report/${date}`, {
        responseType: 'blob'
    });
};

export const updateStatus = (id: number, status: string) => {
    return API.patch(`/admin/orders/${id}/updateStatus`, { status });
};

export const downloadInvoice = () => {
    return API.get('/download-invoice', {
        responseType: 'blob'
    });
};
