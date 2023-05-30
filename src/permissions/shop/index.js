import constant from '@/utils/constant'
const { actionType } = constant

export const buttons = [
    {
        text:'新增',
        type:'primary',  
        action:actionType.ADD
    },
    {
        text:'修改',
        action:actionType.EDIT
    },
    {
        text:'删除',
        danger:true,
        action:actionType.DELETE
    }
]

export const columns = [    
    { field: 'sellerNick', headerName:'店铺', filter: true, sortable: true,resizable: true },
    { field: 'shopType', headerName:'平台', filter: true, sortable: true,resizable: true },
    { field: 'sessionKey', headerName:'授权码', filter: true, sortable: true,resizable: true },
    { field: 'remark', headerName:'备注',filter: true, sortable: true,resizable: true },
    { field: 'creator', headerName:'制单人',filter: true, sortable: true,resizable: true },
    { field: 'createTime', headerName:'制单时间', filter: true, sortable: true,resizable: true },
  ]