import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todos/todosSlice'

const store = configureStore({
    reducer: {
        todos:todosReducer,
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch