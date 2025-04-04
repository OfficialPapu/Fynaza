const { createSlice } = require("@reduxjs/toolkit");
const LoginSlice = createSlice({
    name: "AdminLogin",
    initialState: {
        AdminDetails: null
    },
    reducers: {
        Login: (state, action) => {
            state.AdminDetails = action.payload;
        },
        Logout: (state) => {
            state.AdminDetails = null;
        }
    }
})

export const { Login, Logout } = LoginSlice.actions;
export default LoginSlice.reducer;