import { createSlice } from '@reduxjs/toolkit'
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    collapsed: false,
    theme: 'dark',
    menuMode: 'horizontal',
    // selectMenuKeys:[],
    // openMenuCacheKeys:[],
    // openKeys:[],
    // tabPanes:[],
    // tabActiveKey:'dashboard'
  },
  
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload
    },
    setCollapsed(state, action) {
      state.collapsed = action.payload
    },
    setMenuMode(state, action) {
      state.menuMode = action.payload
    },
    // setOpenMenuCacheKeys(state, action) {
    //   state.openMenuCacheKeys = action.payload
    // } ,
    // setSelectMenuKeys(state, action) {
    //   state.selectMenuKeys = action.payload
    // },
    // setOpenKeys(state, action) {
    //   state.openKeys = action.payload
    // },
    // setTabPanes(state, action) {
    //   state.tabPanes = action.payload
    // },
    // setTabActiveKey(state, action) {
    //   state.tabActiveKey = action.payload
    // },
  }
})

export const { setCollapsed, setTheme, setMenuMode} = appSlice.actions


export default appSlice.reducer
