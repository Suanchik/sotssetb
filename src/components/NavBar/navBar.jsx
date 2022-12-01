import React from 'react';
import './navBar.scss';
import {NavLink} from 'react-router-dom';
import {ReactComponent as Home} from './../../assets/home.svg';
import {ReactComponent as Friends} from './../../assets/users.svg';
import {ReactComponent as Envelope} from './../../assets/envelope.svg';
import {ReactComponent as Users} from './../../assets/users-alt.svg';

const NavBar = () => {
    return (
        <nav className='nav'>
           <div className="link">
            <NavLink to='/'><Home className="icon"/>my profile</NavLink>
           </div>
           {/* <div className="link">
            <Envelope className="icon"/>
            <NavLink to='/messages'>messages</NavLink>
           </div> */}
           <div className="link">
            <NavLink to='/friends'><Users className="icon"/>my followings</NavLink>
           </div>
           <div className="link">
            <NavLink to='/users'><Friends className="icon"/>users</NavLink>
           </div>
        </nav>
    )
};


export default NavBar;