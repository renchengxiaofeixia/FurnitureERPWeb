import request from '@/service/index'


// 新建产品
export const CreateItem = (data) => request.post('/item', data)

// 获取产品详情
export const GetItem = (id) => request.get(`/item/${id}`);

// 获取商品子列表
export const SubItems = (id) => request.get(`/item/subItems/${id}`);

//删除产品
export const DeleteItem = (id) => request.delete(`/item/${id}`);

//修改
export const EditItem = (id, data) => request.put(`/item/${id}`, data);

//分页
export const PageItems = (url, data) => request.post(`/items/page`, data, {
    params: url
});

//分类
export const CatgoriesItem = () => request.get('/item/catgories');

//修改分类id
export const EditItemCat = (id, data) => request.put(`/item/cat/${id}`, data);

//修改分类
export const BatchEditItemCat = (data) => request.put(`/item/cats`, data);

// 通过编号获取商品信息
export const ProductInfoByItemNo = (itemNo) => request.get(`/item/itemNo/${itemNo}`)

// 恢复删除商品
export const RestoreItem = (id, data) => request.put(`/item/${id}`, data)