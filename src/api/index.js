import {signin,signup} from '@/api/auth' 
import {getUsers,createUser,updateUser,deleteUser,getUser,pageUsers} from '@/api/user' 
import {getRoles,createRole,updateRole,deleteRole,getRole,createUserRole,getRoleUsers} from '@/api/role' 
import {getWarehouses,createWarehouse,updateWarehouse,deleteWarehouse,getWarehouse} from '@/api/warehouse' 
import {getShops,createShop,updateShop,deleteShop,getShop} from '@/api/shop' 
export const authApi = {
    signin,signup
}

export const userApi = {
    getUsers,createUser,updateUser,deleteUser,getUser,pageUsers
}

export const roleApi = {
    getRoles,createRole,updateRole,deleteRole,getRole,createUserRole,getRoleUsers
}

export const warehouseApi = {
    getWarehouses,createWarehouse,updateWarehouse,deleteWarehouse,getWarehouse
}

export const shopApi = {
    getShops,createShop,updateShop,deleteShop,getShop
}