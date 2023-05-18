import {createContext, useEffect, useState} from "react";
import React from 'react';
import jwt_decode from "jwt-decode";
import refreshTokens from "../services/refreshTokens.js";
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(null)

    useEffect( () => {
        (async () => {
            const refreshToken = localStorage.getItem('refreshToken');
            if(refreshToken) {
                const data = jwt_decode(refreshToken)
                const now = new Date().getTime() / 1000;
                const exp = new Date(data.exp).getTime()
                if(now < exp) {
                    const tokens = await refreshTokens(refreshToken);
                    setTokens(tokens)
                }
            }
        })();
    }, [])

    const setTokens = (tokens) => {
        if(!(tokens?.accessToken && tokens?.refreshToken)) {
            return;
        }
        setUser(jwt_decode(tokens.accessToken))
        localStorage.setItem('refreshToken', tokens.refreshToken)
    }

    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{
            user,
            setTokens,
            logout,
        }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
