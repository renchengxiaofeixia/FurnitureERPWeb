import React from 'react'
import Dashboard from '@/pages/dashboard'
import Item from '@/pages/Item'
import User from '@/pages/user'
import Role from '@/pages/role'
import Logistic from '@/pages/logistic'
import Shop from '@/pages/shop'
import Supplier from '@/pages/supplier'
import Warehouse from '@/pages/warehouse'


// 路由表
const routes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "item",
    element: <Item />,
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
    element:<Supplier/>,
    path: 'supplier',
  },
  {
    element:<Logistic/>,
    path: 'logistic',
  },
  {
    element:<Warehouse/>,
    path: 'warehouse',
  },
  {
    element:<Shop/>,
    path: 'shop',
  },
]
export default routes


