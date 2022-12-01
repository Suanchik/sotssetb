import React from 'react';
import './NewProfile.scss'

const NewProfile = ({isMyProfile}) => {
    return (
        <div className='loadingProfile'>
            <div className="imgname">
                <div className='nameloading'>
                    <div className='name'></div>
                </div>
                <div className='img'></div>
                {isMyProfile ? 
                    <div className="followButton"></div>:
                    <div className="button"></div>
                }
                <div className='statusloading'></div>
            </div>
            <div className="profileinfo">
                <div className='instruction'></div>
                <div className="backloading"></div>
                <div className='items'><span className='discription'></span><span className='serverloading'><span></span></span></div>
                <div className='items'><span className='discription'></span><span className='serverloading'><span></span></span></div>
                <div className='items last'><span className='discription'></span><span className='serverloading'><span></span></span></div>
                <div className='last'></div>
                <div className='instruction'></div>
                <div className='itemscontacts'><span className='discription'></span><span className='serverloading'><span></span></span></div>
                <div className='itemscontacts'><span className='discription'></span><span className='serverloading'><span></span></span></div>
                <div className='itemscontacts'><span className='discription'></span><span className='serverloading'><span></span></span></div>
            </div>
        </div>
    )
};

export default NewProfile;