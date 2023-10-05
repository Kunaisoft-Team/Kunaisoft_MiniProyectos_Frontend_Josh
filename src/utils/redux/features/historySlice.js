import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
  name: "history",
  initialState: { value: [] },
  reducers: {
    saveOnHistory: ({ value }, { payload }) => {
      value.push(payload)
    }
  }
})

export const { saveOnHistory } = historySlice.actions
export default historySlice.reducer