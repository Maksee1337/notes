import React, {useContext, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import styles from "../signUp/SignUp.module.css";
import Button1 from "../../../ui/button1/Button1.jsx";
import InputError from "../../../ui/inputError/InputError.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../../providers/AuthProvider.jsx";
const apiUrl = import.meta.env.VITE_API_URL;
const Login = () => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm({mode: "onChange"})
    const [authError, setAuthError] = useState(false)
    const navigate = useNavigate();
    const {user, setTokens} = useContext(AuthContext)
    const login = async data => {
        try {
            const response = await axios.post(apiUrl + '/auth/login', data);
            reset();
            console.log(response)
            setAuthError(false)
            setTokens(response.data)
        } catch (e) {
            setAuthError(true)
        }
    }

    useEffect(() => {
        if(user) navigate('/')
    })
    return (
        <form className={styles.form} onSubmit={handleSubmit(login)}>
            <h1>Log In</h1>
            <input
                {...register('email', {
                    required: "Email is required",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                })}
                placeholder='Email'
            />
            <InputError errors={errors} name='email'/>

            <input
                {...register('password', {required: 'Password is required'})}
                type='password'
                placeholder='Password'
            />
            <InputError errors={errors} name='password'/>
            {authError && <p style={{color: "pink"}}>Unauthorized</p>}
            <div className={styles.buttonsBlock}>
                <Button1>Log In</Button1>
                <Button1 to='/signup'>Sign Up</Button1>
                <Button1 to='/'>Home</Button1>

            </div>
        </form>
    );
};

export default Login;
