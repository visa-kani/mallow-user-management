import { createSlice } from "@reduxjs/toolkit";

interface loginState {
    loginData: any;
    loading: boolean;
    error: string | null;
}

const initialState: loginState = {
    loginData: null,
    loading: false,
    error: null
}

export const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
        LoginUser: (state, action) => {
            console.log(action.payload, "loginRedux");
            state.loginData = action.payload
        },
    },
});

export const { LoginUser } = loginSlice.actions;
export default loginSlice.reducer;