import request from '@/api/request'

export const signin = p => request.post('/signin',p)
export const signup = p => request.post('/signup',p)

