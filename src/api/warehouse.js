import request from '@/api/request'

export const createWarehouse = warehouse => request.post('/warehouse',warehouse)
export const getWarehouse = id => request.get(`/warehouse/${id}`)
export const updateWarehouse = (id,warehouse) => request.put(`/warehouse/${id}`,warehouse)
export const deleteWarehouse = id => request.delete(`/warehouse/${id}`)
export const getWarehouses = () => request.get(`/warehouses`)
