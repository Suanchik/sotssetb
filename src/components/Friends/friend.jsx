import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFollowedToProfile } from '../../redux/reducers/profile';
import { cutTooLongString } from '../../utils/utils';
import Following from '../following/following';
import avatar from './../../assets/avatar.jpg'

const Friend = memo(({friend, withNopagination, person}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const isAuth = useSelector(state => state.AuthData.isAuth);
    const isloading = useSelector((state) => state.UsersData.loading);

    const showprofile = (id, followed) => {
        dispatch(setFollowedToProfile(followed))
        return navigate('/profile/' + id)
    }

    return (
        <div className={isloading && withNopagination ? "friend loading" : "friend"}>
            <div className='imgButton'>
                <img onClick={() => showprofile(friend.id,friend.followed)} src={friend.photos.large ? friend.photos.large: avatar} alt="friend" />
                <Following person={person} followed={friend.followed} isAuth={isAuth} id={friend.id}/>
            </div>
            <div className='nameStatus'>
                <div className='name' onClick={() => showprofile(friend.id,friend.followed)}>{friend.name}</div>
                <div className='status'>{
                cutTooLongString(friend.status, 80)
            }</div>
            </div>
        </div>
    )
});

export default Friend;