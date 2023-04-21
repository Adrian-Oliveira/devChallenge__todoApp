import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TodoState {
    complete:boolean,
    todoMessage:string
}

export interface TodosState {
  todosList: any[],
}

const initialState:TodosState = {
  todosList: [],
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todosList.unshift({complete: false, todoMessage:action.payload})
    },
    delTodo: (state, action: PayloadAction<number>) => {
      state.todosList.splice(action.payload, 1)
    },
    todoMarkAsComplete:(state, action: PayloadAction<number>)=>{
      state.todosList[action.payload].complete = true
    }
  },
})

// Action creators are generated for each case reducer function
export const {addTodo,delTodo, todoMarkAsComplete } = todosSlice.actions

export default todosSlice.reducer;