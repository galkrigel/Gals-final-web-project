import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TLoginData } from "../types/TLoginData";
import { TRegisterData } from "../types/TRegisterData";


export const userIdSlice = createSlice({
    name: 'userId',
    initialState: '',
    reducers: {
        login: (state: string, action: PayloadAction<TLoginData>) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload.email ?? action.payload.accessToken;
        },
        logout: (state: string) => {
            //localStorage.removeItem('user');
            return '';
        },
        register: (state: string, action: PayloadAction<TRegisterData>)=> {
            localStorage.setItem('user', JSON.stringify(action.payload));
            return action.payload.email;
        }
    },
});

export const { login, logout } =
    userIdSlice.actions;

export default userIdSlice.reducer;