import { configureStore } from '@reduxjs/toolkit'
import isLoggedInReducer from '../features/isLoggedInSlice'
import userReducer from '../features/user/userSlice'
import tokenReducer from '../features/jwt'

export const store = configureStore({
  reducer: {
    isLoggedIn:isLoggedInReducer, 
    user:userReducer, 
    token:tokenReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch