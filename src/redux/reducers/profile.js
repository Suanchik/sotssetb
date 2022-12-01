import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { ProfileAPI } from '../../api/api';

export const getProfileAsynk = createAsyncThunk(
    'profile/getProfile',
    async function(id, {dispatch}) {
            const res = await ProfileAPI.getProfile(id);
            if(res.data?.userId) {
                dispatch(getStatusAsynk(res.data?.userId))
            }
            return res.data
    }
);

export const getStatusAsynk = createAsyncThunk(
    'profile/getStatus',
    async function(id) {
        const res = await ProfileAPI.getStatus(id);
        return res.data
    }
);

export const addProfileFormInfoAsync = createAsyncThunk(
    'profile/addForm',
    async function(profile, {dispatch, rejectWithValue}) {
            const res = await ProfileAPI.updateProfile(profile);
            if(res.data.resultCode === 0) {
                dispatch(getProfileAsynk(profile.userId));
                dispatch(openEdit(false))
            } else if(res.data.resultCode === 1){
                return rejectWithValue(res.data.messages[0])
            }
    }
);

export const addStatusFormInfoAsync = createAsyncThunk(
    'profile/addStatus',
    async function(status, {dispatch, getState}) {
            const res = await ProfileAPI.updateStatus(status);
            dispatch(getStatusAsynk(getState().ProfileData.profileId))
    }
);

export const addPhotoAsync = createAsyncThunk(
    'profile/savePhoto',
    async function(photo) {
            const res = await ProfileAPI.savePhoto(photo);
            return res.data.data.photos
    }
);


const profileState = createSlice({
    name: 'profile',
    initialState: {
        profileId: '',
        profile: null,
        status: null,
        statusloading: false,
        profileLoading: false,
        followed: '',
        edit: false
    },
    reducers: {
        setFollowedToProfile(state, action) {
            state.followed = action.payload;
        },
        cleareErrors(state) {
            state.error = ''
        },
        openEdit(state, action) {
            state.edit = action.payload
        },
        isLoading(state, action) {
            state.profileLoading = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getProfileAsynk.pending, (state) => {
            state.profileLoading = true
        });
        builder.addCase(getProfileAsynk.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.profileId = action.payload.userId;
        });
        builder.addCase(getStatusAsynk.pending, (state) => {
            state.statusloading = true
        });
        builder.addCase(getStatusAsynk.fulfilled, (state, action) => {
            state.status = action.payload
            state.statusloading = false
        });
        builder.addCase(addProfileFormInfoAsync.rejected, (state, action) => {
            state.error = action.payload;
        });
        builder.addCase(addStatusFormInfoAsync.pending, (state) => {
            state.statusloading = true
        });
        builder.addCase(addStatusFormInfoAsync.fulfilled, (state) => {
            state.statusloading = false
        });
        builder.addCase(addPhotoAsync.fulfilled, (state, action) => {
            state.profile = {...state.profile, photos: action.payload}
        });
    }
});

export const {setFollowedToProfile, cleareErrors, openEdit, isLoading} = profileState.actions
export default profileState.reducer;