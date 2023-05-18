import React, {useContext} from 'react';
import styles from './Header.module.css'
import Button1 from "../ui/button1/Button1.jsx";
import {AuthContext} from "../../providers/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";


const Header = () => {
    const {user, logout} = useContext(AuthContext)
    function redirectToHome() {
        window.location.href = '/'; // Redirect to home route
        window.location.reload(); // Refresh the page
    }
    return (
        <div className={styles.userBlock}>
            <div className={styles.userInfo}>
                <Button1 style={{marginLeft: '0px'}} onClick={redirectToHome} >New note</Button1>
                {!user ?
                    <>
                        <Button1 style={{marginLeft: 'auto'}} to='login'>Log In</Button1>
                        <Button1 style={{marginLeft: '0px'}} to='signup'>Sign up</Button1>
                    </> : <>
                        <p style={{marginLeft: 'auto'}}>email: {user.email}</p>
                        <Button1 onClick={logout}>Log out</Button1>
                    </>}
            </div>
        </div>

    );
};

export default Header;
