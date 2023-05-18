import React from 'react';
import styles from './Footer.module.css'

const Footer = () => {
    return (
        <div className={styles.footerBlock}>
            <p>Our service is a secure messaging platform that allows you to send private and confidential notes to anyone with ease. With our platform, you can create notes that self-destruct after being read, ensuring that your messages remain private and confidential.</p>
        </div>
    );
};

export default Footer;
