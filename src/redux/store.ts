import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todos/todosSlice'
import toggleReducer from './toggle/toggleSlice'

const store = configureStore({
    reducer: {
        todos:todosReducer,
        toggle:toggleReducer,
    },
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch