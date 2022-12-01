import React, { useEffect, useState } from 'react';
import './friends.scss';
import {useSelector, useDispatch} from 'react-redux';
import { getFriendsAsynk } from '../../redux/reducers/users';
import {ReactComponent as Arrow} from './../../assets/arrow-square-down.svg';
import searchinggif from './../../assets/loading-2.gif';
import loading from './../../assets/loading.gif'
import Friend from './friend';
import FriendsInfo from './friendsInfo';
import WithAuth from '../../hoc/withAuthHok';
import { UsersHeadLoading, UsersLoading } from '../LoaudingsComponents/users/usersLoading';
import './friend.scss';


const Friends = () => {

    const friends = useSelector((state) => state.UsersData.friends);
    const friendsTotal = useSelector((state) => state.UsersData.friendsTotal);
    const isloading = useSelector((state) => state.UsersData.loading);
    const searching = useSelector((state) => state.UsersData.searching);
    const [page, setpage] = useState(2);
    const [value, setvalue] = useState('')

    const dispatch = useDispatch();

    const changeValue = (value) => {
        setvalue(value)
    }

    const getMoreFriends = () => {
        dispatch(getFriendsAsynk({page}))
        setpage(page + 1)
    }

    useEffect(() => {
        dispatch(getFriendsAsynk())
    }, []);

    const searchByname = (value) => {
        setvalue(value)
        dispatch(getFriendsAsynk({searchValue: value}))
    }

    return (
        <div className='friends'>
            {
                friends.length || value ?
                <FriendsInfo searchByname={searchByname} value={value} changeValue={changeValue} totalCount={friendsTotal} withNopagination={false}/>:
                <UsersHeadLoading/>
            }
            <div className='friends_block'>
                {
                    friends.length || value? 
                            friends.length ?
                            searching ? 
                            <img className='searching' src={searchinggif} alt="searching" />:
                                friends.map(friend =>
                                    <Friend person={'friend'} key={friend.id} friend={friend} withNopagination={false}/>
                                ):
                                    !value ?
                                    <div className='nousers'>there are no subscriptions, probably you should subscribe to someone</div>:
                                    <div className='nousers'>no matches found</div>:
                            <UsersLoading/>
                }
            </div>
            {friends.length === friendsTotal ? 
            "":
            value == '' && <div>
                { !isloading ?
                    <div className="show_next" onClick={() => getMoreFriends()}>
                    <Arrow className='arrow'/>show more
                </div>:
                <div className="show_next">
                    <img src={loading} alt="just a sec" />just a sec
                </div>}
            </div>
            }
        </div>
    )
};


export default WithAuth(Friends);