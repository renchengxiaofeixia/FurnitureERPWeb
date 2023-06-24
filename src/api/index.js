import {signin,signup} from '@/api/auth' 
import {getUsers,createUser,updateUser,deleteUser,getUser,pageUsers} from '@/api/user' 
import {getRoles,createRole,updateRole,deleteRole,getRole,createUserRole,getRoleUsers,pageRoles,createRolePermits,getRolePermits} from '@/api/role' 
import {getWarehouses,createWarehouse,updateWarehouse,deleteWarehouse,getWarehouse} from '@/api/warehouse' 
import {getShops,createShop,updateShop,deleteShop,getShop} from '@/api/shop' 
import {createItem,getItem,getItems,getSubItems,updateSubItems,deleteItem,updateItem,pageItems,getCats,updateCat,batchUpdateCat} from '@/api/item' 
export const authApi = {
    signin,signup
}

export const userApi = {
    getUsers,createUser,updateUser,deleteUser,getUser,pageUsers
}

export const roleApi = {
    getRoles,createRole,updateRole,deleteRole,getRole,createUserRole,getRoleUsers,pageRoles,createRolePermits,getRolePermits
}

export const warehouseApi = {
    getWarehouses,createWarehouse,updateWarehouse,deleteWarehouse,getWarehouse
}

export const shopApi = {
    getShops,createShop,updateShop,deleteShop,getShop
}

export const itemApi = {
    createItem,getItem,getItems,getSubItems,updateSubItems,deleteItem,updateItem,pageItems,getCats,updateCat,batchUpdateCat
}