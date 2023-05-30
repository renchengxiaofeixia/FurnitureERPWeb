import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    incremented: state => {
      state.count += 1
    },
    decremented: (state,action) => {
      state.count -= 1
      console.log(action);
    }
  }
})


export const { incremented, decremented } = counterSlice.actions

export default counterSlice.reducer