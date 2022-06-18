import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    email: ""
  },
  auth: {
    token: "",
    isConnected: false
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state,{payload: user}) => {
      state.user = { ...state.user, ...user };
    },
    setAuth: (state,{payload: auth}) => {
      state.auth = { ...state.auth, ...auth };
    }
}
})

// Action creators are generated for each case reducer function
export const { setAuth, setUser } = appSlice.actions

export default appSlice.reducer