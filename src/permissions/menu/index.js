const menus = [
    {
        label: '控制面板',
        key: '/dashboard',
    },
    {
        label: '订单管理',
        key: '/trade',
    },
    {
        label: '售后管理',
        key: '/aftersale',
    },
    {
        label: '商品管理',
        key: '/item',
    },
    {
        label: '基础资料',
        key:'basedata',
        children:[
            {
                label: '供应商',
                key: '/supplier',
            },
            {
                label: '物流',
                key: '/logistic',    
            },
            {
                label: '仓库',
                key: '/warehouse',    
            },
            {
                label: '店铺',
                key: '/shop',    
            },
        ]
    },
    {
        label: '系统管理',
        key:'system',
        children:[
            {
                label: '用户信息',
                key: '/user',
            },
            {
                label: '角色信息',
                key: '/role',    
            },
        ]
    }
]

export default menus