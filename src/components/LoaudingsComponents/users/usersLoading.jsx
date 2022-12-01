import React from 'react';
import './usersLoading.scss';

export const UsersHeadLoading = ({pagination}) => {
    return (
        <div>
            <div className="headLoading">
                <div className='countLoading'></div>
                <div className='searchLoading'></div>
            </div>
            {pagination ?
            <div className='paginationLoading'>
                <div className='prevLoading'></div>
                <div className='pagesBlockLoading'>
                    {Array(10).fill(0).map((el, index) => 
                    <div className='pageLoading' key={index}>
                    </div>
                    )}
                </div>
                <div className="nextLoading"></div>
            </div>:
            ''
            }
        </div>
    )
};

export const UsersLoading = () => {
    return (
        Array(21).fill(0).map((el, index) => <div key={index} className='usersLoading'>
        <div className='imgButtonLoading'>
            <div className="imgLoading"></div>
            <div className="buttonLoading"></div>
        </div>  
        <div className='nameStatusLoading'>
            <div className="nameLoading"><div></div></div>
            <div className="statusLoading"></div>
        </div>
    </div>)
    )
};