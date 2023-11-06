import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    const [error, setError] = React.useState(false);
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    })
    const collect = async () => {
        if (!name || !email || !password) {
            setError(true);
            return false;
        }
        else{
        console.log(name, email, password);
        let ans = await fetch('http://localhost:5000/producter/'+email);
        ans= await ans.json();
        if(ans.length<=0)
        {
            let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },

            })
            result = await result.json();
            console.log(result);
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/add');
        }
        else{
            alert("Email id is already registered please try another id");
        }
        
    }
    }
    return (
        <div>
            <h1>Register</h1>
            <input className="register" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name'></input>
            {error && !name && <span className="Help">Enter Valid Name</span>}
            <input className="register" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' required></input>
            {error && !email && <span className="Help">Enter Valid email</span>}
            <input className="register" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' required></input>
            {error && !password && <span className="Help">Enter Valid password</span>}
            <button onClick={collect} className="button">Sign-Up</button>
        </div>
    )

}

export default SignUp;