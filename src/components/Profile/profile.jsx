import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfileAsynk, isLoading, openEdit } from '../../redux/reducers/profile';
import './profile.scss'
import ProfileForm from './profileForm';
import ProfileInfo from './profileInfo';
import WithAuth from '../../hoc/withAuthHok';
import NewProfile from '../LoaudingsComponents/profile/NewProfile';
import ProfileImgStatus from './profileImgStatus';


const Profile = () => {

    const isAuth = useSelector(state => state.AuthData.isAuth);
    const profileId = useSelector(state => state.AuthData.data.id);
    const profileBll = useSelector(state => state.ProfileData.profile);
    const edit = useSelector(state => state.ProfileData.edit);
    const status = useSelector(state => state.ProfileData.status);
    const isfollowed = useSelector(state => state.ProfileData.followed);
    const profileLoading = useSelector(state => state.ProfileData.profileLoading);
    const [profile, setprofile] = useState(profileBll);
    const [isShowed, setisShowed] = useState(false);
    const [isFinishedLoading, setIsFinishedLoading] = useState(false);
    const dispatch = useDispatch();

    const {userId} = useParams();

    useEffect(() => {
        if(isAuth) {
            dispatch(getProfileAsynk(userId ? userId: profileId))
        }
    }, [userId]);

    useEffect(() => {
        if(isFinishedLoading) {
            dispatch(isLoading(false))
            setIsFinishedLoading(false)
        }
    },[profile])

    useEffect(() => {
        if(!userId || profile?.userId !== profileBll?.userId) {
            setprofile(profileBll)
            setIsFinishedLoading(true)
        }
    }, [profileBll]);

    useEffect(() => {
        if(edit) {
            dispatch(openEdit(false))
        }
    }, [])

    const openPhoto = () => {
        setisShowed(true)
    }

    return (
        <div>
            {
                !profileLoading && profile ?
                <div className='profile'>
                    {
                    isShowed ?
                    <div className="openedPhotoWindowBlock">
                        <div className='openedPhotoWindow'>
                            <div className='close' onClick={() => setisShowed(false)}>&#10006;</div>
                            <img src={profile.photos?.large} alt="photoOpened" />
                        </div>
                    </div>:
                    null
                    } 
                    <ProfileImgStatus  profile={profile} userId={userId} isfollowed={isfollowed} status={status} openPhoto={openPhoto}/>
                    {
                    !edit ?
                    <ProfileInfo profile={profile} userId={userId} />:
                    <ProfileForm profile={profile} profileId={profileId}/>
                    }
                </div>:
                <NewProfile isMyProfile={userId} />
            }
        </div>
    )
};


export default WithAuth(Profile);