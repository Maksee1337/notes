import React from 'react';
import {Link} from "react-router-dom";
import styles from './Button1_link.module.css'

const Button1_link = ({children, ...attributes}) => {
    return (
        <Link {...attributes} className={styles.btn}>{children}</Link>
    );
};

export default Button1_link;
