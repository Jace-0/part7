import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlog(state, action){
      return action.payload
    },
    Blogs(state, action) {
      return state
    }
  }
})

export const { setBlog , Blogs } = blogSlice.actions

export default blogSlice.reducer
