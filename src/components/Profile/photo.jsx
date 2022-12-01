import React from 'react';
import { useDispatch } from 'react-redux';
import { addPhotoAsync } from '../../redux/reducers/profile';
import ava from './../../assets/avatar.jpg'
import glass from './../../assets/magnifying-glass.png'

const Photo = ({profile, userId, openPhoto}) => {

    const dispatch = useDispatch();

    const getFiles = (e) => {
        const photos = Array.from(e.target.files);
        dispatch(addPhotoAsync(photos[0]));
    }

    return (
        <div className='img'>
            {profile.photos?.large ?
            <div onClick={() => openPhoto()} className='glass'>
                <img src={glass} alt='glass'/>
            </div>:
             ''}
            <div>{<img className='ava' src={profile.photos?.large ? profile.photos?.large: ava} alt='userimg'/>}</div>
            {userId ? 
            '':
            <div className='addPhoto'>
                <input style={{display: 'none'}} type="file" id="file" onChange={e => getFiles(e)} />
                <label htmlFor="file">New photo</label>
            </div>}
        </div>
    )
};

export default Photo;