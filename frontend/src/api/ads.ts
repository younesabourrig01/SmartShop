import client from './client';

export const getAds = () => {
    return client.get('/ads');
};

export const createAd = (data: FormData) => {
    return client.post('/admin/ads', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const updateAd = (id: number, data: FormData) => {
    // Note: Laravel requires POST with _method=PUT to handle multipart/form-data correctly
    data.append('_method', 'PUT');
    return client.post(`/admin/ads/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export const deleteAd = (id: number) => {
    return client.delete(`/admin/ads/${id}`);
};
