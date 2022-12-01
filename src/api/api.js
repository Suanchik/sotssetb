import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    headers: {
        'API-KEY': 'ef8a4b9c-1df0-4c77-aba0-118c4d1a37cf'
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

export const UsersAPI = {
    getUsers (Page = 1, searchValue = '') {
        return instance.get(`users?page=${Page}&count=21&term=${searchValue}`)},
    UnFollow (id) {
        return instance.delete(`follow/${id}`)
    },
    Follow (id) {
        return instance.post(`follow/${id}`)
    },
    getFriends (page = 1, searchValue = '') {
        return instance.get(`users?page=${page}&count=21&friend=true&term=${searchValue}`)
    }
};


export const ProfileAPI = {
    getStatus(peopleID) {
        return instance.get(`profile/status/${peopleID}`)
    },
    getProfile(peopleID) {
        return instance.get(`profile/${peopleID}`)
    },
    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status})
    },
    updateProfile(profile) {
        return instance.put(`profile/`, profile)
    },
    savePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo)
        return instance.put(`profile/photo/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
};

export const AuthAPI = {
    Auth() {
        return instance.get(`auth/me`)
    },
    Login (email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
    },
    Logout () {
        return instance.delete(`auth/login`)
    },
    getCaptcha () {
        return instance.delete(`security/get-captcha-url`)
    }
} 