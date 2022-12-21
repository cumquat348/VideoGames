import React, { useState } from "react"

import { Navigate, useNavigate ,useLocation } from 'react-router'
import { useEffect } from "react";
export default function (props) {
    
    const navigate = useNavigate();

    const handleSignOut=(evt)=>{
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            console.log('back')
            navigate('/', {  replace: true })
            window.location.reload();
        }
        xhttp.open("POST", "/signout", true);
        xhttp.send();
    }
    useEffect(() => {
        handleSignOut()

        })

    return (null)
}
