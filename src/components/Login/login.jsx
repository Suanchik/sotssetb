import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logInAsync } from '../../redux/reducers/auth';
import InputLogin from './inputLogin';
import './login.scss'


const Login = () => {

    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.AuthData.isAuth);
    const emailError = useSelector(state => state.AuthData.emailError);
    const captcha = useSelector(state => state.AuthData.captcha);
    const loading = useSelector(state => state.AuthData.loading);

    console.log(isAuth)

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: 'onChange'});

    const addProfileFormInfo = (e) => {
        const data = {email: e.login, password: e.password, captcha: e.captcha ? e.captcha: null}
        dispatch(logInAsync(data));
    };

    return (
        <>
            {
                isAuth ?
                <Navigate replace to="/" />:
                <div className='loginForm'>
                    <form onSubmit={handleSubmit(addProfileFormInfo)} className='forml'>
                        <h2>INITIALIZATION</h2>
                        <InputLogin errors={errors.login} register={register} name={'login'} type={'text'} placeholder={'login...'}/>
                        <InputLogin errors={errors.password} register={register} name={'password'} type={'password'} placeholder={'password...'}/>
                        <button>log in</button>
                        <div className='SreverError'>{emailError}</div>
                        { captcha ? 
                        <div className="captchaBlock">
                            <img src={captcha} alt="captcha" />
                            <input type="text" placeholder="captcha..." {...register('captcha')}/>
                        </div>
                        : ''}
                    </form>
                </div>
            }
        </>
    )
};


export default Login;