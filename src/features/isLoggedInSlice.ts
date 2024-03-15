import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
  isLoggedInValue: boolean
}

const initialState: userState = {
    isLoggedInValue: false,
}

export const isLoggedInSlice = createSlice({
  name: 'isLoggedIn',
  initialState,
  reducers: {
    isLoggedIn: (state, actionPayload : PayloadAction<boolean>) => {
      state.isLoggedInValue = actionPayload.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { isLoggedIn } = isLoggedInSlice.actions

export default isLoggedInSlice.reducer