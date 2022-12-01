import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const WithAuth = (Component, props) => {
    const IsAuth = () => {

        const isAuth = useSelector(state => state.AuthData.isAuth);
        return (
            <>
                {
                    isAuth ? 
                    <Component {...props}/>:
                    <Navigate replace to="/Login"/>
                }
            </>
        )
    };

    return IsAuth;
};

export default WithAuth;