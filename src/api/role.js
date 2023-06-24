
import request from '@/service/index'

export const createRole = role => request.post('/role',role)
export const getRole = id => request.get(`/role/${id}`)
export const updateRole = (id,role) => request.put(`/role/${id}`,role)
export const deleteRole = id => request.delete(`/role/${id}`)
export const getRoles = () => request.get(`/roles`)
export const pageRoles = (param) => request.get(`/roles/page?${param}`)
export const createUserRole = (roleUsers) => request.post(`/role/userrole`,roleUsers)
export const createRolePermits = (permits) => request.post(`/role/permits`,permits)
export const getRolePermits = (id) => request.get(`/role/permits/${id}`)
export const getRoleUsers = id => request.get(`/role/users/${id}`)
