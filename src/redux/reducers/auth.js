import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { AuthAPI } from '../../api/api';

export const authAsync = createAsyncThunk(
    'auth/auth',
    async function() {
        const res = await AuthAPI.Auth();
        if(res.data.resultCode === 0) {
            return [res.data.data, true]
        } else {
            return [res.data.data, false]
        }
    }
);

export const logOutAsync = createAsyncThunk(
    'auth/logOut',
    async function(_, {dispatch}) {
        const res = await AuthAPI.Logout();
        dispatch(authAsync())
        return res.data
    }
);

export const getCapchaAsync = createAsyncThunk(
    'auth/getCapcha',
    async function() {
        const res = await AuthAPI.getCaptcha();
        return res.data
    }
);

export const logInAsync = createAsyncThunk(
    'auth/logIn',
    async function(data, {dispatch}) {
        const res = await AuthAPI.Login(data.email, data.password, false, data.captcha);
        if(res.data.resultCode === 1) {
            return res
        } else if(res.data.resultCode === 10) {
            dispatch(getCapchaAsync())
            return res
        } else {
            dispatch(authAsync())
        }
    }
);

const authState = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        data: {},
        loading: false,
        emailError: '',
        captcha: ''
    },
    extraReducers(builder) {
        builder.addCase(authAsync.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(authAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.data =  action.payload[0]
            state.isAuth = action.payload[1]
        });
        builder.addCase(logInAsync.fulfilled, (state, action) => {
            if(action.payload){
                state.emailError = action.payload.data.messages[0]
            }
        });
        builder.addCase(getCapchaAsync.fulfilled, (state, action) => {
            state.captcha = action.payload.url
        });
    }
});

export default authState.reducer