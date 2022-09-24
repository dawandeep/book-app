import React,{useEffect,useState} from "react";
import config from './config';
import {useNavigate} from "react-router-dom";
export default function AuthHoc(Component){
    function NewComponent(){
        const navigate = useNavigate();
        useEffect(()=>{
            fetch(`${config.authapi}/isAuthenticated`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.status === 401) {
                        navigate('/login');
                    } else {
                        return <Component />;
                    }
                });
        }, []);
        return <Component />;
    }
    return NewComponent;
}