import constant from '@/utils/constant'
const { actionType } = constant

export const buttons = [
    {
        id:'new',
        text:'新增',
        type:'primary',  
        action:actionType.ADD
    },
    {
        id:'edit',
        text:'修改',
        action:actionType.EDIT
    },
    {
        id:'delete',
        text:'删除',
        danger:true,
        action:actionType.DELETE
    },
    {
        id:'add_subitem',
        text:'添加子商品',
        action:actionType.ADD_SUBITEM
    },
    {
        id:'import',
        text:'导入',
        action:actionType.IMPORT
    }
]

export const columns = [    
    { field: 'itemName', headerName:'名称', filter: true, sortable: true,resizable: true },
    { field: 'itemNo', headerName:'编码', filter: true, sortable: true,resizable: true },
    { field: 'volume', headerName:'体积',filter: true, sortable: true,resizable: true },
    { field: 'packageQty', headerName:'件数',filter: true, sortable: true,resizable: true },
    { field: 'remark', headerName:'备注',filter: true, sortable: true,resizable: true },
    { field: 'creator', headerName:'制单人',filter: true, sortable: true,resizable: true },
    { field: 'createTime', headerName:'制单时间', filter: true, sortable: true,resizable: true },
]