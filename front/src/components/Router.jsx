import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Home from "./screens/home/home.jsx";
import Login from "./screens/auth/login/Login.jsx";
import SignUp from "./screens/auth/signUp/SignUp.jsx";

const Router = createBrowserRouter([
    {path: '/', element: <Home/>},
    {path: '/login', element: <Login/>},
    {path: '/signup', element: <SignUp/>},
    {path: '/note/*', element: <SignUp/>},
])

export default Router;
