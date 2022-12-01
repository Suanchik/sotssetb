import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { UsersAPI } from '../../api/api';
import { setFollowedToProfile } from './profile';

export const getFriendsAsynk = createAsyncThunk(
    'users/getFriends',
    async function(options, {dispatch}) {
        if(options?.page) {
            dispatch(isLoading(true))
            const res = await UsersAPI.getFriends(options.page);
            dispatch(isLoading(false))
            return [res.data.items, options.page, res.data.totalCount]
        } else if(!options?.searchValue && !options?.page) {
            dispatch(isLoading(true))
            const res = await UsersAPI.getFriends();
            dispatch(isLoading(false))
            return [res.data.items, null, res.data.totalCount]
        } else if(options?.searchValue) {
            dispatch(isSearching(true))
            const res = await UsersAPI.getFriends(null, options?.searchValue);
            dispatch(isSearching(false))
            return [res.data.items, null, res.data.totalCount]
        }
    }
);

export const getUsersAsynk = createAsyncThunk(
    'users/getUsers',
    async function(options, {dispatch}) {
        if(!options?.searchValue) {
            dispatch(isLoading(true))
            const res = await UsersAPI.getUsers(options?.page);
            dispatch(isLoading(false))
            return [res.data.items, null, res.data.totalCount]
        } else {
            dispatch(isSearching(true))
            const res = await UsersAPI.getUsers(null, options.searchValue);
            dispatch(isSearching(false))
            return [res.data.items, null, res.data.totalCount]
        }
    }
);



export const followingAsynk = createAsyncThunk(
    'users/following',
    async function(options, {dispatch}) {
        if(options.follow) {
            const res = await UsersAPI.Follow(options.id);
            if(options.isProfile) {
                dispatch(setFollowedToProfile(options.follow))
            }
            return [options.follow, options.id, options.person]
        } else {
            const res = await UsersAPI.UnFollow(options.id);
            if(options.isProfile) {
                dispatch(setFollowedToProfile(options.follow))
            }
            return [options.follow, options.id, options.person]
        }
    }
);

const usersState = createSlice({
    name: 'users',
    initialState: {
        friends: [],
        friendsTotal: 0,
        users: [],
        usersTotal: 0,
        loading: false,
        searching: false,
        followloading: false,
        error: ''
    },
    reducers: {
        isLoading(state, action) {
            state.loading = action.payload;
        },
        isSearching(state, action) {
            state.searching = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(getFriendsAsynk.fulfilled, (state, action) => {
            state.loading = false;
            typeof action.payload[1] === 'number' ? 
            state.friends = [...state.friends, ...action.payload[0]]:
            state.friends = [...action.payload[0]]
            ;
            state.error = '';
            state.friendsTotal = action.payload[2]
        });
        builder.addCase(getUsersAsynk.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload[0]
            state.error = '';
            state.usersTotal = action.payload[2]
        });
        builder.addCase(followingAsynk.pending, (state) => {
            state.followloading = true
        });
        builder.addCase(followingAsynk.fulfilled, (state, action) => {
            let persons;
            if(action.payload[2] == 'user') {
                 persons = 'users'
            } else {
                 persons = 'friends'
            }
            state.followloading = false;
            state[persons] = state[persons].map(el => {
                if(el.id === action.payload[1]) {
                    return {
                        ...el,
                        followed: action.payload[0]
                    }
                } else {
                    return el
                }
            })
            state.error = '';
        });
    }
});

export default usersState.reducer;
export const {isLoading, isSearching} = usersState.actions