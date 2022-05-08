import { createSlice } from '@reduxjs/toolkit'

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  //可以在原函数上直接修改  immer帮处理了
  reducers: {
    openProjectModal(state){
      state.projectModalOpen = true
    },
    closeProjectModal(state){
      state.projectModalOpen = false
    }
  }
})

export const projectListActions = projectListSlice.actions