import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOutAsync } from '../../redux/reducers/auth';
import snicon from './../../assets/snicon.png';
import './header.scss';

const Header = () => {

    const isAuth = useSelector(state => state.AuthData.isAuth);
    const loading = useSelector(state => state.AuthData.loading)
    const dispatch = useDispatch()

    return (
        <header className='header'>
            <h1>
               <span className='sotsset'>
               <img src={snicon} alt="snicon" />
                    <span>otsset</span>
                    <span className='softsign'>ь</span>
                    <span className='login'>
                        {
                            loading ?
                            '':
                            <span>
                                {
                                    isAuth ? 
                                    <span className='log' onClick={() => dispatch(logOutAsync())}>log out</span>: 
                                    <NavLink to="/login"><span className='log'>log in</span></NavLink>
                                }
                            </span>
                        }
                </span>
                </span>
            </h1>
        </header>
    )
};


export default Header;