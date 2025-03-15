const { createSlice } = require("@reduxjs/toolkit");
const LoginSlice = createSlice({
    name: "AdminLogin",
    initialState: {
        isAuth: false,
        AdminDetails: null
    },
    reducers: {
        Login: (state, action) => {
            state.isAuth = true;
            state.AdminDetails = action.payload;
        },
        Logout: (state) => {
            state.isAuth = false;
            state.AdminDetails = null;
        }
    }
})

export const { Login, Logout } = LoginSlice.actions;
export default LoginSlice.reducer;