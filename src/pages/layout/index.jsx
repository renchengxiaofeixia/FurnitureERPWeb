import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { Layout, Menu, theme, App, Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCollapsed
} from '@/store/modules/app'
import 'reset-css'
import './layout.scss'
import { useLocalStorage } from 'react-use';

import menus from '@/permissions/menu'
import routes from '@/router'

const { Header, Content, Footer, Sider } = Layout;

const AppLayout = () => {
  const userInfo = useSelector(state => state.login)
  const collapsed = useSelector(state => state.app)

  const [localOpenTabKeys, setLocalOpenTabKeys] = useLocalStorage('openTabKeys', [{ key: 'dashboard', label: '控制面板', parentKey: '' }]);  
  const [localTabActiveKey, setLocalTabActiveKey] = useLocalStorage('tabActiveKey','dashboard'); 

  const defaultTabPane = routes.filter(r => localOpenTabKeys.some(k => k.key == r.path)).map(r => {
    const openTab = localOpenTabKeys.find(k => k.key == r.path)
    return { label: openTab.label, key: r.path, children: r.element, closable: !(r.path === 'dashboard') }
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
    //未登录
    if (!token) navigate('/login')

    
    selectTab(localTabActiveKey)
  }, [])

  const menuClick = (item) => {
    const route = routes.find(r => item.key.endsWith(r.path))
    if (!tabPanes.some(t => t.key == route.path)) {
      setTabPanes([...tabPanes, { label: item.domEvent.target.innerText, key: route.path, children: route.element }])
    }
    setTabActiveKey(route.path)
    setSelectMenuKeys([item.key])
    if (!openMenuCacheKeys.some(k => k.key == item.key)) {
      setOpenMenuCacheKeys([...openMenuCacheKeys, item])
    }
    else {
      setOpenMenuCacheKeys([item])
    }
    if (!localOpenTabKeys.some(k => k.key == route.path)) {
      setLocalOpenTabKeys([...localOpenTabKeys, { key: route.path, label: item.domEvent.target.innerText, parentKey: item.keyPath[1] }])
    }
  }

  const onChange = (newActiveKey) => {
    setLocalTabActiveKey(newActiveKey)
    selectTab(newActiveKey)
    //navigate(item.key)
  };

  const selectTab = (newActiveKey)=>{
    
    setTabActiveKey(newActiveKey);
    const menuKey = `/${newActiveKey}`
    setSelectMenuKeys([menuKey])
    const selectMenu = openMenuCacheKeys.find(k => k.key == menuKey)
    const localStorageValue = localOpenTabKeys.find(k => k.key == newActiveKey)
    if (!localOpenTabKeys.some(k => k.key == newActiveKey)) {
      setLocalOpenTabKeys([...localOpenTabKeys, { key: newActiveKey, label: selectMenu.domEvent.target.innerText, parentKey: selectMenu ? selectMenu.keyPath[1] : localStorageValue.parentKey }])
    }
    if (selectMenu) {
      setOpenKeys([selectMenu.keyPath[1]]);
    }
    else if (localStorageValue) {
      setOpenKeys([localStorageValue.parentKey]);
    }

  }


  const onOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const onEdit = (targetKey, action) => {
    if (targetKey == 'dashboard') return;
    if (action === 'remove') {
      removeTabPane(targetKey);
      setLocalOpenTabKeys(localOpenTabKeys.filter(k => k.key !== targetKey))
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
      <Layout className='layout'>
        <Header style={{ height: '64px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div className='logo-vertical'></div>
          <div></div>
        </Header>
        <Layout>
          <Sider collapsible onCollapse={() => dispatch(setCollapsed(!collapsed))} style={{
            background: '#001529',
          }}>
            <Menu theme='dark' defaultSelectedKeys={['/dashboard']} selectedKeys={selectMenuKeys}
              mode="inline"
              items={menus}
              onClick={menuClick}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
            />
          </Sider>

          <Content className='content'>
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
            {/* <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Ant Design ©2023 Created by Ant UED
            </Footer> */}
          </Content>
        </Layout>
      </Layout>
    </App>
  )
}

export default AppLayout
