
import request from '@/service/index'

export const createUser = user => request.post('/user',user)
export const getUser = id => request.get(`/user/${id}`)
export const updateUser = (id,user) => request.put(`/user/${id}`,user)
export const deleteUser = id => request.delete(`/user/${id}`)
export const getUsers = () => request.get(`/users`)
export const pageUsers = param => request.get(`/users/page?${param}`)
