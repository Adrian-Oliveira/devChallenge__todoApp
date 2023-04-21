import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TodoState {
    id:number
    complete:boolean,
    todoMessage:string
}

export interface TodosState {
  idList: number[],
  todosList: TodoState[],
}

const initialState:TodosState = {
  idList:[],
  todosList: [],
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.idList.push(state.todosList.length)
      state.todosList.push({id: state.todosList.length,complete: false, todoMessage:action.payload})
    },
    delTodo: (state, action: PayloadAction<number>) => {
      const index = state.idList.indexOf(action.payload)
      state.idList.splice(index, 1)
    },
    todoMarkAsComplete:(state, action: PayloadAction<number>)=>{
      state.todosList[action.payload].complete = true
    },
    todoMarkAsIncomplete:(state, action: PayloadAction<number>)=>{
      state.todosList[action.payload].complete = false
    }
  },
})

// Action creators are generated for each case reducer function
export const {addTodo,delTodo, todoMarkAsComplete,todoMarkAsIncomplete } = todosSlice.actions

export default todosSlice.reducer;