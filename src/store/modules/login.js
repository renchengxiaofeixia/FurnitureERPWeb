import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'login',
  initialState: {
      userName: '',
      merchantName:'',
      menus: [],
      token: localStorage.getItem("token") ?? null
  },
  reducers: {
    setLoginInfo: (state, action) => {
      state.merchantName = action.payload.merchantName
      state.userName = action.payload.userName
      state.menus = action.payload.menus
      state.token = action.payload.token
    }
  }
})

export const { setLoginInfo } = userSlice.actions

export default userSlice.reducer
