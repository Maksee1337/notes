import React from 'react';
import Header from "../../header/Header.jsx";
import Footer from "../../footer/Footer.jsx";
import Body from "../../body/Body.jsx";

const Home = () => {
    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <Body/>
            <Footer/>
        </div>
);
};

export default Home;
