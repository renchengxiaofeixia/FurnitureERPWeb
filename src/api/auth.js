import request from '@/service/index'

export const signin = p => request.post('/signin',p)
export const signup = p => request.post('/signup',p)

