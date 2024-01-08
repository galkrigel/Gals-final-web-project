import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userIdSlice = createSlice({
    name: 'userId',
    initialState: '',
    reducers: {
        changeUserId: (state: string, action: PayloadAction<string>) => {
            return action.payload;
        },
        resetUserId: (state: string, action: PayloadAction<string>) => {
            return '';
        },
    },
});

export const { changeUserId, resetUserId } =
    userIdSlice.actions;

export default userIdSlice.reducer;