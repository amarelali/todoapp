import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../interfaces'


export interface userState {
  user:IUser
}

const initialState: userState = {
  user: {
    id: 0,
    username: "",
    email: "",
    provider: "",
    confirmed: true,
    blocked: false,
    createdAt: "",
    updatedAt: "",
    contact_number: ""
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userData: (state , actionPayload: PayloadAction<IUser>) => {
      state.user = actionPayload.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { userData } = userSlice.actions

export default userSlice.reducer