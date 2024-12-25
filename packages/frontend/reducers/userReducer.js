import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name : 'user',
  initialState: {
    user: null
  },
  reducers :{
    setUser(state, action){
      state.user = action.payload
    },
    getUser(state, action){
      return state.user
    }
  }
})

export const { setUser, getUser } = userSlice.actions

export default userSlice.reducer