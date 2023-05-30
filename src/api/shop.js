import request from '@/service/index'

export const createShop = shop => request.post('/shop',shop)
export const getShop = id => request.get(`/shop/${id}`)
export const updateShop = (id,shop) => request.put(`/shop/${id}`,shop)
export const deleteShop = id => request.delete(`/shop/${id}`)
export const getShops = () => request.get(`/shops`)
