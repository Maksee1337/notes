import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import styles from './Button1.module.css'

const Button1 = ({children, ...attributes}) => {
    const navigate = useNavigate();
    if (attributes?.to) {
        attributes.onClick = () => {
            navigate(attributes.to)
        }
    }
    return (
        <button {...attributes} className={styles.btn}>{children}</button>
    );
};

export default Button1;
