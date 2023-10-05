import { configureStore } from '@reduxjs/toolkit'

import loginReducer       from './features/loginSlice.js'
import taskReducer        from './features/taskSlice.js'
import historyReducer     from './features/historySlice.js'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    task: taskReducer,
    history: historyReducer
  }
})