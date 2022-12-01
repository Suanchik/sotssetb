import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addProfileFormInfoAsync, cleareErrors, openEdit } from '../../redux/reducers/profile';
import './profileForm.scss'


const ProfileForm = ({profile, profileId}) => {

    const error = useSelector(state => state.ProfileData.error);

    const [profileValues, setprofileValues] = useState({
        fullName: profile.fullName,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        aboutMe: profile.aboutMe
    });

    const [profileContactsValues, setprofileContactsValues] = useState({
        facebook: profile.facebook,
        website: profile.website,
        vk: profile.vk,
        twitter: profile.twitter,
        instagram: profile.instagram,
        youtube: profile.youtube,
        github: profile.github,
        mainLink: profile.mainLink
    });

    const [lookingForAJob, setlookingForAJob] = useState(profile.lookingForAJob)

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit, 
        formState: {}
    } = useForm();

    useEffect(() => {
        if(error){
            dispatch(cleareErrors())
        }
    }, [])

    const addProfileFormInfo = (e) => {
        const profilFormObject = {
            userId: profileId,
            lookingForAJob: lookingForAJob,
            lookingForAJobDescription: e.lookingForAJobDescription,
            fullName: e.fullName,
            aboutMe: e.aboutMe,
            contacts: {
                github: e.github,
                vk: e.vk,
                facebook: e.facebook,
                instagram: e.instagram,
                twitter: e.twitter,
                website: e.website,
                youtube: e.youtube,
                mainLink: e.mainLink
            }
        }
        dispatch(addProfileFormInfoAsync(profilFormObject))
    }

    return (
        <div className='form'>
            <div className='instruction'>each field must be filled in, at the request of the server</div>
            <div className="back" 
            onClick={() => dispatch(openEdit(false))}
            >go back</div>
            <form onSubmit={handleSubmit(addProfileFormInfo)} className='profileForm'>
                <div className='form_item'>
                    <span>full name</span>
                    <input
                        {...register('fullName', {required: true, maxLength: 60, value: profileValues.fullName})}
                        onChange={(e) => setprofileValues({...profileValues, fullName: e.target.value})} 
                    />
                </div>
                <div className='form_item'>
                    <span>aboute me</span>
                    <textarea   
                        {...register('aboutMe', { maxLength: 100, value: profileValues.aboutMe})}
                        onChange={(e) => setprofileValues({...profileValues, aboutMe: e.target.value})}
                    />
                </div>
                <div className='form_item'>
                    <span>looking for a job</span>
                    {
                        lookingForAJob ?
                        <span><span onClick={() => setlookingForAJob(false)} className='true serverInfo'>✓</span></span>:
                        <span><span onClick={() => setlookingForAJob(true)} className='false serverInfo'>✓</span></span>
                    }
                </div>
                <div className='form_item'>
                    <span>looking for a job description</span>
                    <textarea
                        {...register('lookingForAJobDescription', { maxLength: 100, value: profileValues.lookingForAJobDescription})}
                        onChange={(e) => setprofileValues({...profileValues, lookingForAJobDescription: e.target.value})} 
                        />
                </div>
                <div className='error'>
                    {error ? error: ''}
                </div>
                <hr />
                <h2 className='contacts'>contacts</h2>
                <div className='instruction'>each field must be filled in, with correct url</div>
                {
                    Object.keys(profile?.contacts)?.
                    map(el => 
                    <div key={el} className='form_item'>
                       <span> {el}</span>
                       <input 
                            type="text"  
                            {...register(`${el}`, {value: profile.contacts[el]})}
                            onChange={(e) => setprofileContactsValues({...profileContactsValues, [el]: e.target.value})}
                            />
                    </div>
                    )
                }
                <hr />
                <button className='save'>save</button>
            </form>
        </div>
    )
};


export default ProfileForm;