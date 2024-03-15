import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface tokenState {
  tokenValue: string
}

const initialState: tokenState = {
    tokenValue: "",
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, actionPayload : PayloadAction<string>) => {
      state.tokenValue = actionPayload.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setToken } = tokenSlice.actions

export default tokenSlice.reducer