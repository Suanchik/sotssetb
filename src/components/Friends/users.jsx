import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersAsynk } from '../../redux/reducers/users';
import User from './friend';
import FriendsInfo from './friendsInfo';
import searchinggif from './../../assets/loading-2.gif';
import './friend.scss';
import { UsersHeadLoading, UsersLoading } from '../LoaudingsComponents/users/usersLoading';


const Users = () => {

    const users = useSelector((state) => state.UsersData.users);
    const usersTotal = useSelector((state) => state.UsersData.usersTotal);
    const isloading = useSelector((state) => state.UsersData.loading);
    const searching = useSelector((state) => state.UsersData.searching);
    const [value, setvalue] = useState('');

    const changeValue = (value) => {
        setvalue(value)
    }


    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getUsersAsynk())
    }, []);

    const searchByname = (value) => {
        dispatch(getUsersAsynk({searchValue: value}))
    }

    return (
        <div className='friends'>
            {
                users.length || value?
                <FriendsInfo searchByname={searchByname} value={value} changeValue={changeValue} totalCount={usersTotal} withNopagination={true}/>:
                <div style={{marginBottom: '48px'}}>
                    <UsersHeadLoading pagination={true}/>
                </div>
            }
            <div className='friends_block'>
                {
                !isloading?
                users.length ? 
                searching ? 
                <img className='searching' src={searchinggif} alt="searching" />:
                    users.map(user =>
                        <User person={'user'} key={user.id} friend={user} withNopagination={true}/>
                    ):
                    !value ? <div className='nousers'>there are no subscriptions, probably you should subscribe to someone</div>:
                    <div className='nousers'>no matches found</div>:
                    <UsersLoading/>
                }
            </div>
        </div>
    )
};


export default Users;