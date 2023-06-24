import React from 'react'
import Dashboard from '@/pages/dashboard'
import User from '@/pages/user'
import Role from '@/pages/role'
import Item from '@/pages/item'


// 路由表
const routes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "user",
    element: <User />,
  },
  {
    path: "role",
    element: <Role />,
  },
  {
    path: "item",
    element: <Item />,
  },
]

export default routes