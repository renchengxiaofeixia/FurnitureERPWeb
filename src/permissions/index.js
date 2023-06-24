import { buttons as userButtons, columns as userColumns } from './user'
import { buttons as roleButtons, columns as roleColumns } from './role'

//key 对应 menu 的key
export default [
    {
        key: '/user',
        permissions: {
            buttons: userButtons,
            grids: [{id:'usergrid',gridName:'用户信息',columns: userColumns}]
        }
    },
    {
        key: '/role',
        permissions: {
            buttons: roleButtons,
            grids: [{id:'rolegrid',gridName:'角色信息',columns: roleColumns}]
        }
    }
]