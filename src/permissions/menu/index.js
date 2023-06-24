const menus = [
    // {
    //     label: '新品出图',
    //     key:'create_new_product_picture',
    //     children:[
    //         {
    //             label: '资料整理',
    //             key: '/supplier',
    //         },
    //         {
    //             label: '模型建立',
    //             key: '/logistic',    
    //         },
    //         {
    //             label: '渲染图片',
    //             key: '/warehouse',    
    //         },
    //         {
    //             label: '图片审核',
    //             key: '/shop',    
    //         },
    //         {
    //             label: '父主题',
    //             key: '/shop',    
    //         },
    //         {
    //             label: '产品上架',
    //             key: '/shop',    
    //         },
    //     ]
    // },
    // {
    //     label: '成品定板',
    //     key:'system',
    //     children:[
    //         {
    //             label: '供应商选定',
    //             key: '/user',
    //         },
    //         {
    //             label: '出板跟进',
    //             key: '/role',    
    //         },
    //         {
    //             label: '板型确定',
    //             key: '/role',    
    //         },
    //         {
    //             label: '成本核算',
    //             key: '/role',    
    //         },
    //     ]
    // },
    {
        label: '商品管理',
        key:'item',
        children:[
            {
                label: '商品资料',
                key: '/item',
            },
        ]
    },
    {
        label: '系统管理',
        key:'system',
        children:[
            {
                label: '用户',
                key: '/user',
            },
            {
                label: '角色',
                key: '/role',    
            },
        ]
    }
]

export default menus