import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from "./components/screens/home/home.jsx";
import './assets/styles/global.css'
import {RouterProvider} from "react-router-dom";
import Router from "./components/Router.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={Router}/>
        </AuthProvider>
    </React.StrictMode>
);
