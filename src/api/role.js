
import request from '@/api/request'

export const createRole = role => request.post('/role',role)
export const getRole = id => request.get(`/role/${id}`)
export const updateRole = (id,role) => request.put(`/role/${id}`,role)
export const deleteRole = id => request.delete(`/role/${id}`)
export const getRoles = () => request.get(`/roles`)
export const createUserRole = (roleUsers) => request.post(`/role/userrole`,roleUsers)
export const getRoleUsers = id => request.get(`/role/users/${id}`)
