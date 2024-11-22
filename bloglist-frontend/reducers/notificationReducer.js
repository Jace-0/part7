import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null
  },
  reducers : {
    makeNotification(state, action){
      state.message = action.payload.notif
      state.type = action.payload.type
    },
    clearNotification(state, action){
      state.message = null
      state.type = null
    }
  }

})

export const { makeNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notif, type) => {
  return async dispatch => {
    dispatch(makeNotification({ notif, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer