import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
  name: "task",
  initialState: { value: [] },
  reducers: {
    saveTasks: ({ value }, { payload }) => {
      value.push(payload)
    }
  }
})

export const { saveTasks } = taskSlice.actions
export default taskSlice.reducer