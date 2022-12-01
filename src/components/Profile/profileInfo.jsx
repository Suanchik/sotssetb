import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openEdit } from '../../redux/reducers/profile';
import { cutTooLongString } from '../../utils/utils';
import nocontacts from './../../assets/nocontacts.png'
import './profileInfo.scss'

const ProfileInfo = ({profile, userId}) => {

    const [showPopap, setshowPopap] = useState(false);
    const dispatch = useDispatch();

    const newContacts = useMemo(() => {
        return Object.keys(profile?.contacts)?.filter(el => profile.contacts[el])
    }, [profile.contacts])

    return (
        <div className='profileInfo'>
            {
                !userId ?
                <div className="edit" 
                onClick={() => dispatch(openEdit(true))}
                >edit</div>:
                ''
            }
            <div className="mainInfo">
                <div className='instruction'>main information</div>
                <div className='list_item'>
                    <span className='discription'>aboute me</span>
                    <span className='serverInfo' 
                        style={{cursor: profile.aboutMe?.length > 50 ? 'pointer': 'auto'}}
                        onMouseOver={() => setshowPopap(true)}
                        onMouseOut={() => setshowPopap(false)}
                        >
                            {profile.aboutMe ?
                            cutTooLongString(profile.aboutMe, 50):
                            <span className='noInfo'>no information available</span>}
                    </span>
                    {
                    profile.aboutMe?.length > 50 && showPopap ? 
                    <div className={"popap"}>
                        {profile.aboutMe}
                    </div>:
                    ''
                    }
                </div>
                <div className='list_item'>
                    <span className='discription'>looking for a job</span>
                    {
                        profile.lookingForAJob ?
                        <span>yes</span>:
                        <span>no</span>
                    }
                </div>
                <div className='list_item'><span className='discription'>job discription</span><span className='serverInfo'>
                    {profile.lookingForAJobDescription ? 
                    profile.lookingForAJobDescription:
                    <span className='noInfo'>no information available</span>
                }</span></div>
            </div>
            <div className='contacts'>
                <div className='instruction'>contacts of user</div>
                <div>
                {
                    newContacts?.length ? newContacts.map(el =>
                        <div key={el} className='list_item'>
                            <span className='discription'>{el}</span>
                            <span className='serverInfo'>{profile.contacts[el]}</span>
                        </div>
                    ):
                    <div className='nocontacts'>
                        <img src={nocontacts} alt="nocontacts" />
                        <div>contacts are not specified</div>
                    </div>
                }
                </div>
            </div>
        </div>
    )
};

export default ProfileInfo;