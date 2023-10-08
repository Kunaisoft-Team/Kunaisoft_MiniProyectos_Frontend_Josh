import { createSlice, createAsyncThunk }  from '@reduxjs/toolkit'

export const fetchTasks = createAsyncThunk("task/fetchTasks", response => response)

export const taskSlice = createSlice({
  name: "task",
  initialState: { 
    loading: false,
    tasks: [],
    user: {},
    error: ""
  },
  extraReducers: builder => {
    builder.addCase(fetchTasks.pending, state => {
      state.loading = true
    })

    builder.addCase(fetchTasks.fulfilled, (state, {payload}) => {
      state.loading = false
      state.tasks   = payload.tasks
      state.user    = payload.user
    })

    builder.addCase(fetchTasks.rejected, (state, { error }) => {
      state.error = error.message
    })
  }
})

export const { saveTasks } = taskSlice.actions
export default taskSlice.reducer