import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ToggleState {
  toggle: "complete"|"active"|"all"
}

const initialState:ToggleState = {
  toggle: "all",
}

export const toggleSlice = createSlice({
  name: 'toggle',
  initialState,
  reducers: {
    changeToggle: (state, action: PayloadAction<ToggleState>) => {
      state.toggle = action.payload.toggle
    },
  },
})

// Action creators are generated for each case reducer function
export const {changeToggle} = toggleSlice.actions

export default toggleSlice.reducer;