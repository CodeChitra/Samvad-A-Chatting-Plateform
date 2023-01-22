import React from 'react'
import { Link } from 'react-router-dom';
import "./styles/Register.scss";
function Register() {
    return (
        <div className='register'>
            <div className="wrapper">
                <div className="left">
                    <div className="welcome">
                        <h1>Welcome Back!</h1>
                        <p>Login to discover and chat with new friends</p>
                        <button><Link to="/login">Login</Link></button>
                    </div>
                </div>
                <div className="right">
                    <h1>Create Account</h1>
                    <form>
                        <input type="text" placeholder='Enter Display Name' />
                        <input type="email" placeholder='Enter Email' />
                        <input type="password" placeholder='Enter Password' />
                        <input type="file" id='avatar' style={{ display: "none" }} />
                        <label htmlFor="avatar">
                            <img src="https://cdn-icons-png.flaticon.com/128/2659/2659360.png" alt="" />
                            <p>Choose Avatar</p>
                        </label>
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
