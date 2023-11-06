import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout= ()=>{
        localStorage.clear();
        navigate('/signup')
    }
    return( 
        <div>
            <img className="ok123" src="https://img.freepik.com/premium-vector/abstract-modern-ecommerce-logo-design-colorful-gradient-shopping-bag-logo-template_467913-995.jpg?w=2000" alt="logo" width="40"/>
            {

            auth?
            <ul className='nav-ul'>
                <li><Link to="/List">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={logout} to = "/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul> :
            <ul className='nav-ul nav-right'>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
            </ul>
            }
        </div>
    )
}

export default Nav;