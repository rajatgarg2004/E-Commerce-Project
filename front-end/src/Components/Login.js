import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
const Login=()=>{
    const navigate= useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    })
    const handleLogin = async()=>{
        console.log(email,password);
        email=email.toLowerCase();
        let result = await fetch("http://localhost:5000/login",{
            method:"POST",
            body: JSON.stringify({email,password}),
            headers: {
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.auth)
        {
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/List');
        }
        else{
            alert("Please enter correct details");
        }
    }
    let [email,setEmail]= React.useState('');
    let [password,setPassword]= React.useState('');
    return(
        <div>
            <h1>Login Page</h1>
            <input className ="register" type="text"  value ={email} onChange={ (e) =>{setEmail(e.target.value)}} placeholder="Enter Email-Id"/>
            <input className ="register" type="password" value = {password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter Password"/>
            <button className="button" onClick={handleLogin} >Login</button>
        </div>
    )
}
export default Login;