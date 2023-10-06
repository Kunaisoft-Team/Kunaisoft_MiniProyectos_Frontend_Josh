import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    value: {
      name: "",
      email: "",
      password: ""
    }
  },
  reducers: {
    setUserData: (state, { payload }) => {
      state.value[payload.key] = payload.value
    }
  }
})

export const { setUserData } = loginSlice.actions
export default loginSlice.reducer