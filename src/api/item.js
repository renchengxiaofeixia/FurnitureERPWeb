import request from '@/service/index'


// 新建产品
export const createItem = (item) => request.post('/item', item)

// 获取产品详情
export const getItem = (id) => request.get(`/item/${id}`);

// 获取商品子列表
export const getSubItems = (id) => request.get(`/item/subItems/${id}`);

//删除产品
export const deleteItem = (id) => request.delete(`/item/${id}`);

//修改
export const updateItem = (id, item) => request.put(`/item/${id}`, item);

//分页
export const pageItems = (param) => request.get(`/items/page?${param}`);

//分类
export const getCats = () => request.get('/item/cats');

//修改分类id
export const updateCat = (id, cat) => request.put(`/item/cat/${id}`, cat);

//修改分类
export const batchUpdateCat = (cats) => request.put(`/item/cats`, cats);

