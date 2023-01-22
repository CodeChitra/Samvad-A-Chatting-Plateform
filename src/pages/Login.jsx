import React from 'react'
import { Link } from 'react-router-dom';
import "./styles/Login.scss";
function Login() {
    return (
        <div className='login'>
            <div className="wrapper">
                <div className="left">
                    <div className="welcome">
                        <h1>New To Fire Chat!</h1>
                        <p>Register to discover and chat with new friends</p>
                        <button><Link to="/register">Register</Link></button>
                    </div>
                </div>
                <div className="right">
                    <h1>Login To Your Account</h1>
                    <form>
                        <input type="email" placeholder='Enter Email' />
                        <input type="password" placeholder='Enter Password' />
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
