import {
  createSlice
} from '@reduxjs/toolkit'

import {
  PageItems,
  DeleteItem,
  CreateItem,
  EditItem,
  GetItem,
  EditItemCat,
  BatchEditItemCat,
  SubItems,
  RestoreItem
} from '@/Api/item'

const itemSlice = createSlice({
  name: 'item',
  initialState: {
      isLoading: {
          itemLoading: false,
          subLoading: false,
      },
      items: [],
      selectedItem: {},
      page: {
          current: 1,
          pageSize: 50,
          total: 0,
          pageSizeOptions: [10, 20, 50, 100],
          Status: ''

      },
      isOpenEditPopup: {
          props: 'add',
          isPopup: false
      },
      tltieMessage: '',
      subItems: [],
      editSubItems: [], // 编辑商品的规格数据
      previewImage: '',
  },
  reducers: {
      setup: (state, action) => {
          state.items = action.payload.items;
          state.page.total = action.payload.totalItems;
          state.page.current = action.payload.pageNo;
          state.page.pageSize = action.payload.pageSize || 10;
          state.page.Status = action.payload.Status || '';

      },
      add: (state, action) => {
          state.items.push(action.payload)
          state.page.total++;
      },
      edit(state, action) {
          state.items.forEach((item, index) => {
              if (item.id == action.payload.id) {
                  state.items[index] = action.payload
              }
          })

      },
      del(state, action) {
          state.items.forEach((item, index) => {
              if (item.id == action.payload) {
                  state.items.splice(index, 1)
                  state.page.total--;
              }
          })
      },
      setTltieMessage(state, action) {
          state.tltieMessage = action.payload;
      },
      setLoading(state, action) {
          state.isLoading = {
              ...state.isLoading,
              ...action.payload
          };
      },
      setPage(state, action) {
          state.page.current = action.payload;
      },
      setItem(state, action) {
          state.selectedItem = action.payload;
          state.previewImage = action.payload.picPath || '';
      },
      setSubItems(state, action) {
          state.subItems = action.payload;
      },
      changeEditPopupOpen(state, action) {
          state.isOpenEditPopup = action.payload
      },
      searchValue(state, action) {
          state.keyword = action.payload
      },
      setEditSubItems(state, action) {
          state.editSubItems = action.payload;
      },
      setPreviewImage(state, action) {
          state.previewImage = action.payload;
      },
  }
})


export const {
  setup,
  add,
  edit,
  del,
  setLoading,
  setPage,
  changeEditPopupOpen,
  searchValue,
  catgoriesData,
  setItem,
  setTltieMessage,
  setSubItems,
  setEditSubItems,
  setPreviewImage
} = itemSlice.actions


export const loadAsync = (payload, data = []) => {
  return async (dispatch, getState) => {
      dispatch(setLoading({
          itemLoading: true
      }));
      var res = await PageItems(payload, data)
      dispatch(setup({
          ...res.data,
          pageSize: payload.pageSize,
          Status: payload.Status

      }));
      dispatch(setItem({}))
      dispatch(setLoading({
          itemLoading: false
      }));
  }
}

export const delAsync = (payload) => {
  return async (dispatch, getState) => {
      var res = await DeleteItem(payload)
      dispatch(del(payload));

  }
}


export const addAsync = (payload) => {
  return async (dispatch, getState) => {
      var res = await CreateItem(payload)
      dispatch(add(res.data));

  }
}

export const SubAsync = (payload) => {
  return async (dispatch, getState) => {
      dispatch(setLoading({
          subLoading: true
      }));
      var res = await SubItems(payload)
      dispatch(setSubItems(res.data));
      dispatch(setEditSubItems(res.data))
      dispatch(setLoading({
          subLoading: false
      }));
  }
}

export const editAsync = (payload, data) => {
  return async (dispatch, getState) => {
      var res = await EditItem(payload, data)
      dispatch(edit(res.data));
  }
}

export const GetItemAsync = (payload) => {
  return async (dispatch, getState) => {
      var res = await GetItem(payload)
      dispatch(setItem(res.data))
  }
}

export const EditCatAsync = (payload) => {
  return async (dispatch) => {
      var res = await BatchEditItemCat(payload)
  }
}

export const RestoreItemAsync = (payload, data) => {
  return async (dispatch) => {
      var res = await RestoreItem(payload, data)
      dispatch(del(payload));
  }
}

export default itemSlice.reducer