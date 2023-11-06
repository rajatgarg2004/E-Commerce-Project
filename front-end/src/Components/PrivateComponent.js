import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
const PrivateComponent = ()=>{
    const auth = localStorage.getItem('user');
    if(auth)
    {return <Outlet />}
    else
    {
       return <Navigate to="/signup" />
    }
}

export default PrivateComponent;