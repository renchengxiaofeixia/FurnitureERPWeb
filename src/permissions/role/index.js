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
        id:'roleuser',
        text:'角色用户',
        action:actionType.CREATE_ROLEUSER
    },
    {
        id:'rolepermit',
        text:'角色权限',
        action:actionType.ROLE_PERMIT
    }
]

export const columns = [    
    { field: 'roleName', headerName:'角色名', filter: true, sortable: true,resizable: true },
    { field: 'usersName', headerName:'用户列表', filter: true, width:400 , sortable: true,resizable: true },
    { field: 'remark', headerName:'备注',filter: true, sortable: true,resizable: true },
    { field: 'creator', headerName:'制单人',filter: true, sortable: true,resizable: true },
    { field: 'createTime', headerName:'制单时间', filter: true, sortable: true,resizable: true },
  ]