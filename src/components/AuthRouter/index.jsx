
import React from 'react'
import { useLocation, Navigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

function AuthRouter(props) {
    const userInfo = useSelector(state => state.login)
    const { token } = userInfo
    const { pathname } = useLocation();
    if (pathname === '/login') return props.children
    if (!token) {
        return <Navigate to="/login" /> 
    } else {
        return props.children
    }
}

export default AuthRouter
