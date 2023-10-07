import axios                              from 'axios'
import { createSlice, createAsyncThunk }  from '@reduxjs/toolkit'
import { SERVER_URL, TASKS_ROUTE }        from '../../../utils/consts.js'

export const fetchTasks = createAsyncThunk("task/fetchTasks", () => {
  return axios.get(SERVER_URL + TASKS_ROUTE)
  .then(res => res.data.tasks)
})

export const taskSlice = createSlice({
  name: "task",
  initialState: { 
    loading: false,
    tasks: [],
    error: ""
  },
  extraReducers: builder => {
    builder.addCase(fetchTasks.pending, state => {
      state.loading = true
    })

    builder.addCase(fetchTasks.fulfilled, (state, {payload}) => {
      state.loading = false
      state.tasks   = payload 
    })

    builder.addCase(fetchTasks.rejected, (state, { error }) => {
      state.error = error.message
    })
  }
})

export const { saveTasks } = taskSlice.actions
export default taskSlice.reducer