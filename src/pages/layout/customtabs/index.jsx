import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import menus from '@/permissions/menu'
import routes from '@/router'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalStorage } from 'react-use';

import {
    setSelectMenuKeys, setOpenKeys,
    setTabPanes, setTabActiveKey
} from '@/store/modules/app'

import './tabs.scss'

const CustomTabs = () => {
    const { openMenuCacheKeys, tabActiveKey, tabPanes } = useSelector(state => state.app)

    const [value, setValue] = useLocalStorage('openTabKeys', [{ key: 'dashboard', label: '控制面板' }]);

    const dispatch = useDispatch()

    const defaultTabPane = routes.filter(r => value.some(k => k.key == r.path)).map(r => {
        const openTab = value.find(k => k.key == r.path)
        return { label: openTab.label, key: r.path, children: r.element }
    })
    useEffect(() => {
        dispatch(setTabPanes(defaultTabPane))
    }, [])

    // const [tabActiveKey, setTabActiveKey] = useState('dashboard');
    // const [tabPanes, setTabPanes] = useState(defaultTabPane)


    const onChange = (newActiveKey) => {
        setTabActiveKey(newActiveKey);
        const menuKey = `/${newActiveKey}`
        setSelectMenuKeys([menuKey])
        const selectMenu = openMenuCacheKeys.find(k => k.key == menuKey)
        if (!value.some(k => k.key == newActiveKey)) {
            setValue([...value, { key: newActiveKey, label: selectMenu.domEvent.target.innerText }])
        }
        if (selectMenu) {
            setOpenKeys([selectMenu.keyPath[1]]);
        }
    };

    const onEdit = (targetKey, action) => {
        console.log(action);
        if (action === 'remove') {
            removeTabPane(targetKey);
            setValue(value.filter(k => k.key !== targetKey))
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
    );
};
export default CustomTabs;