import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Layout, Menu, theme, App, Tabs} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCollapsed
} from '@/store/modules/app'
import './layout.scss'
import { useLocalStorage } from 'react-use';

import menus from '@/permissions/menu'
import routes from '@/router'

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  const userInfo = useSelector(state => state.login)
  const collapsed = useSelector(state => state.app)

  const [value, setValue] = useLocalStorage('openTabKeys', [{key:'dashboard',label:'控制面板',parentKey:''}]);
  const defaultTabPane = routes.filter(r=>value.some(k=>k.key == r.path)).map(r=>{
    const openTab = value.find(k=>k.key == r.path)
    return { label: openTab.label, key: r.path, children: r.element }
  })  
  const [tabActiveKey, setTabActiveKey] = useState('dashboard');
  const [selectMenuKeys, setSelectMenuKeys] = useState([]);  
  const [openMenuCacheKeys, setOpenMenuCacheKeys] = useState([]);
  const [tabPanes, setTabPanes] = useState(defaultTabPane)  
  const [openKeys, setOpenKeys] = useState([]);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { token } = userInfo

  useEffect(() => {
    // 未登录
    if (!token) navigate('/login')
  }, [token])

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuClick = (item) => {
    const route = routes.find(r => item.key.endsWith(r.path))
    if (!tabPanes.some(t => t.key == route.path)) {
      setTabPanes([...tabPanes, { label: item.domEvent.target.innerText, key: route.path, children: route.element }])
    }
    setTabActiveKey(route.path)
    setSelectMenuKeys([item.key])
    if(!openMenuCacheKeys.some(k=>k.key == item.key)){
      setOpenMenuCacheKeys([...openMenuCacheKeys,item])
    }
    else{
      setOpenMenuCacheKeys([item])
    }
    if(!value.some(k=>k.key == route.path))
    {
      setValue([...value,{key:route.path,label:item.domEvent.target.innerText,parentKey:item.keyPath[1]}])
    }
  }

  const onChange = (newActiveKey) => {
    setTabActiveKey(newActiveKey);
    const menuKey = `/${newActiveKey}`
    setSelectMenuKeys([menuKey])
    const selectMenu = openMenuCacheKeys.find(k=>k.key == menuKey)
    const localStorageValue = value.find(k=>k.key == newActiveKey)
    if(!value.some(k=>k.key == newActiveKey))
    {
      setValue([...value,{key:newActiveKey,label:selectMenu.domEvent.target.innerText,parentKey:selectMenu ? selectMenu.keyPath[1] : localStorageValue.parentKey}])
    }
    if(selectMenu){
      setOpenKeys([selectMenu.keyPath[1]]);
    }
    else if(localStorageValue){
      setOpenKeys([localStorageValue.parentKey]);
    }

    //navigate(item.key)
  };

  const onOpenChange = (keys) => {
      setOpenKeys(keys);
  };

  const onEdit = (targetKey, action) => {
    if(targetKey == 'dashboard') return;
    if (action === 'remove') {
      removeTabPane(targetKey);
      setValue(value.filter(k=>k.key !== targetKey))
    }
  };

  const removeTabPane = (targetKey) => {
    let newActiveKey = tabActiveKey;
    let lastIndex = -1;
    tabPanes.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = tabPanes.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setTabPanes(newPanes);
    setTabActiveKey(newActiveKey);
  };

  return (
    <App>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible onCollapse={() => dispatch(setCollapsed(!collapsed))} style={{
          background: '#001529',
        }}>
          <div className="logo-vertical" />
          <Menu defaultSelectedKeys={['/dashboard']} selectedKeys ={selectMenuKeys} 
            mode="inline" theme='dark' items={menus} onClick={menuClick}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin:0, display: 'flex', flexDirection: 'column'
            }}
          >
            <Tabs className='tab_heade_content'
              hideAdd
              size='small'
              type="editable-card"
              onChange={onChange}
              activeKey={tabActiveKey}
              items={tabPanes}
              onEdit={onEdit}
              >
            </Tabs>
            {/* <Outlet /> */}
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout></App>
  )
}

export default AppLayout
