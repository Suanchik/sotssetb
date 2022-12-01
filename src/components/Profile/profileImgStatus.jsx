import React from 'react';
import Following from '../following/following';
import Photo from './photo';
import ProfileStatus from './profileStatus';
import './profileImgStatus.scss'

const ProfileImgStatus = ({openPhoto, profile, userId, isfollowed, status}) => {

    return (
        <div className='profileImgStatus'>
            <div className='photoName'>
            <div className='name'>{profile.fullName}</div>
                <Photo openPhoto={openPhoto} profile={profile} userId={userId}/>
                <div style={{height: '50px'}}>
                {
                userId?
                    <Following followed={isfollowed} id={profile.userId} isitProfile={true}/>:
                ''
                }
            </div>
            </div>
            <ProfileStatus status={status} userId={userId} followed={isfollowed}/>
        </div>
    )
};

export default ProfileImgStatus;