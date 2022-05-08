import { configureStore } from '@reduxjs/toolkit'
import { projectListSlice } from 'screens/project-list/projectList.slice'

export const rootReducer = {
  kanbanList: projectListSlice.reducer
}

export const store = configureStore({
  reducer: rootReducer

})

export type AppDispath = typeof store.dispatch
export type RooterStore = ReturnType<typeof store.getState>
