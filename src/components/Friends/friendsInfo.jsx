import React, { useState } from 'react';
import Pagination from './pagination';
import './friendsInfo.scss'

const FriendsInfo = ({totalCount, withNopagination, searchByname, value, changeValue}) => {

    const getValue = (e) => {
        changeValue(e.target.value)
        searchByname(e.target.value)
    }

    return (
        <>
            <div className='friends_info'>
                <div className='count'>
                    {
                    totalCount ?
                    <span className='followings'>{totalCount.toLocaleString()} {!withNopagination ? 'followings': 'users'}</span>:
                    <span className='followings'>0 {!withNopagination ? 'followings': 'users'}</span>
                    }
                </div>
                <input 
                    type="text" 
                    placeholder='search by name... '
                    onChange={(e) => getValue(e)}
                />
                <div>
                    {withNopagination && value == '' ? <Pagination totalCount={totalCount}/>:
                    value !== '' && totalCount > 1 && 
                    <div className='explanation'>
                        Please, write a more specific name to find the one you are looking for
                    </div>
                    }
                </div>
            </div>
        </>
    )
};

export default FriendsInfo;