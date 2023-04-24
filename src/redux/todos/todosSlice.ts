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
const savedStateString = localStorage.getItem('savedState');

if(savedStateString){
  const savedState = JSON.parse(savedStateString);
  initialState.idList = savedState.idList;
  initialState.todosList = savedState.todosList;
}


export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.idList.unshift(state.todosList.length)
      state.todosList.push({id: state.todosList.length,complete: false, todoMessage:action.payload})
    },
    delTodo: (state, action: PayloadAction<number>) => {
      const index = state.idList.indexOf(action.payload)
      state.idList.splice(index, 1)
    },
    delAllTodosCompleted: (state, action: PayloadAction<number[]>) => {
     
      state.idList = state.idList.filter((id)=>{
        return action.payload.indexOf(id)<0;
      })
    },
    todoMarkAsComplete:(state, action: PayloadAction<number>)=>{
      state.todosList[action.payload].complete = true
    },
    todoMarkAsIncomplete:(state, action: PayloadAction<number>)=>{
      state.todosList[action.payload].complete = false
    },
    setIds:(state, action: PayloadAction<number[]>)=>{
      state.idList = action.payload
    },
    setTodos:(state, action: PayloadAction<TodoState[]>)=>{
      state.todosList = action.payload
    },
    saveTodosInTheLocalStorage:(state)=>{
      const [todosList, idList] = [state.todosList, state.idList];
      localStorage.setItem('savedState', JSON.stringify({todosList, idList}));
    }
  },
})

// Action creators are generated for each case reducer function
export const {addTodo,delTodo, todoMarkAsComplete,
             todoMarkAsIncomplete, delAllTodosCompleted,
             setIds, setTodos,saveTodosInTheLocalStorage } = todosSlice.actions

export default todosSlice.reducer;