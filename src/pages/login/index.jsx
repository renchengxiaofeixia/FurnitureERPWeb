import React, { useEffect, FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, message } from 'antd'
import './login.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setLoginInfo } from '@/store/modules/login'
import { authApi } from '@/api'
import menus from '@/permissions/menu'

const LoginForm = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state=>state.login)
  const navigate = useNavigate()
  useEffect(() => {
    const { token } = userInfo
    if (token) {
      navigate('/')
    }
  }, [dispatch, userInfo])

  // 触发登录方法
  const onFinish = async (values) => {
    const { userName, password } = values
    try {
      const res = await authApi.signin({ userName, password })
      localStorage.setItem("token",res.data.token)
      dispatch(setLoginInfo({...res.data,menus:menus}))
      navigate('/')
    } catch (e) {
      const response = e.response // Axios异常
      message.error(
        response
          ? `${response.data}`
          : `${e}`
      )
    }
  }
  return (
    <div className="login-layout" id="login-layout">
      <div className="logo-box">
        <img alt="" className="logo" />
        <span className="logo-name"></span>
      </div>
      <Form
        initialValues={{ userName: 'admin', password: '123456' }}
        className="login-form"
        name="login-form"
        onFinish={onFinish}
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="用户名" prefix={<UserOutlined />} size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
          extra="用户名：admin 密码：123456"
        >
          <Input.Password
            placeholder="密码"
            prefix={<LockOutlined />}
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Button
            className="login-form-button"
            htmlType="submit"
            size="large"
            type="primary"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
