import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import "./styles/Login.scss";
function Login() {
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }
        catch (error) {
            setErr(error.message);
        }
    }
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
                    <form onSubmit={handleFormSubmit}>
                        <input type="email" placeholder='Enter Email' />
                        <input type="password" placeholder='Enter Password' />
                        <button type='submit'>Login</button>
                        {err && <span>{err}</span>}
                    </form>
                </div>
            </div>
            <div className="credit">Developed By Akash Deep Chitransh!</div>
        </div>
    )
}

export default Login
