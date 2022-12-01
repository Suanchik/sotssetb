import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { authAsync } from './auth';

export const initializedAsync = createAsyncThunk(
    'app/initialised',
    async function(_, {dispatch}) {
        await dispatch(authAsync());
        dispatch(initialized())
    }
)

const appSlice = createSlice({
    name: 'appInitialized',
    initialState: {
        initialized: false
    },
    reducers: {
        initialized(state) {
            state.initialized = true;
        }
    }
});


export const {initialized} = appSlice.actions
export default appSlice.reducer