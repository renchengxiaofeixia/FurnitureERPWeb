import { buttons as userButtons, columns as userColumns } from './user'
import { buttons as roleButtons, columns as roleColumns } from './role'
import { buttons as shopButtons, columns as shopColumns } from './shop'
import { buttons as warehouseButtons, columns as warehouseColumns } from './warehouse'

//key 对应 menu 的key
export default [
    {
        key: '/user',
        permissions: {
            buttons: userButtons,
            columns: userColumns
        }
    },
    {
        key: '/role',
        permissions: {
            buttons: roleButtons,
            columns: roleColumns
        }
    },
    {
        key: '/warehouse',
        permissions: {
            buttons: warehouseButtons,
            columns: warehouseColumns
        }
    },
    {
        key: '/shop',
        permissions: {
            buttons: shopButtons,
            columns: shopColumns
        }
    }
]