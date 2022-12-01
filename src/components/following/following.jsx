import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followingAsynk } from '../../redux/reducers/users';

const Following = ({person, followed, isAuth = true, id, isitProfile = false}) => {

    const followloading = useSelector((state) => state.UsersData.followloading);
    const dispatch = useDispatch();

    const [isDisabledButton, setisDisabledButton] = useState('');

    const unFollow = (id) => {
        setisDisabledButton(id)
        dispatch(followingAsynk({follow: false, id: id, isProfile: isitProfile, person}))
    };

    useEffect(() => {
        if(!followloading) {
            if(isDisabledButton) {
                setisDisabledButton('')
            }
        }
    },[followloading])

    const follow = (id) => {
        setisDisabledButton(id)
        dispatch(followingAsynk({follow: true, id: id, isProfile: isitProfile, person}));
    };

    const souldLogin =  () => {
        alert('you should log in to follow people')
    }

    return (
        <>
            {
                followed ?
                <div>
                    {
                    followloading && (isDisabledButton === id) ? 
                    <button className='unfollow unfollowing'>unfollowing</button>:
                    <button 
                        className='unfollow' 
                        onClick={() => isAuth ? unFollow(id): souldLogin()}>
                            unfollow
                    </button>
                    }
                </div>:
                <div>
                {
                    followloading && (isDisabledButton === id) ?
                    <button className='follow following'>following</button>:
                    <button 
                        className='follow' 
                        onClick={() => isAuth ? follow(id): souldLogin()}>follow</button>
                }
                </div>
            }
        </>
    )
};

export default Following;