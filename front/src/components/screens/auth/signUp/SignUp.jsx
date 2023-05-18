import React, {useContext, useEffect, useState} from 'react';
import styles from './SignUp.module.css'
import {useForm} from "react-hook-form";
import Button1_link from "../../../ui/button1_link/Button1_link.jsx";
import Button1 from "../../../ui/button1/Button1.jsx";
import InputError from "../../../ui/inputError/InputError.jsx";
import axios from "axios";
import {AuthContext} from "../../../../providers/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
const apiUrl = import.meta.env.VITE_API_URL;
const formSchema = Yup.object().shape({
    password: Yup.string()
        .required('Password is mendatory')
        .min(8, 'Password must be at 8 char long'),
    confirmPassword: Yup.string()
        .required('Password is mendatory')
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
})
const SignUp = () => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm({mode: "onChange", resolver: yupResolver(formSchema)})
    const [signupError, setSignupError] = useState(null)
    const navigate = useNavigate();
    const {user, setTokens} = useContext(AuthContext)
    const signUp = async data => {
        try {
            const response = await axios.post(apiUrl + '/auth/signup', data);
            reset();
            setSignupError(null)
            setTokens(response.data)
        } catch (e) {
            console.log(e)
            setSignupError(e.response.data.message);
        }
    }
    useEffect(() => {
        if(user) navigate('/')
    })
    return (
        <form className={styles.form} onSubmit={handleSubmit(signUp)}>
            <h1>Sign up</h1>
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

            <input
                {...register('confirmPassword', {required: 'Confirm password is required'})}
                type='password'
                placeholder='Confirm password'
            />
            <InputError errors={errors} name='confirmPassword'/>
            {signupError && <p style={{color: "pink"}}>{signupError}</p>}
            <div className={styles.buttonsBlock}>
                <Button1>Sign Up</Button1>
                <Button1 to='/login'>Log In</Button1>
                <Button1 to='/'>Home</Button1>
            </div>
        </form>
    );
};

export default SignUp;
