import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./styles/Register.scss";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
function Register() {
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const avatar = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            //to get user --> res.user
            console.log(res.user);
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, avatar);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed',
                (snapshot) => {

                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.log(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL
                        })

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    });
                }
            );
        }
        catch (error) {
            setErr(error.message);
        }
    }
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
                    <form onSubmit={handleFormSubmit}>
                        <input type="text" placeholder='Enter Display Name' />
                        <input type="email" placeholder='Enter Email' />
                        <input type="password" placeholder='Enter Password' />
                        <input type="file" id='avatar' style={{ display: "none" }} />
                        <label htmlFor="avatar">
                            <img src="https://cdn-icons-png.flaticon.com/128/2659/2659360.png" alt="" />
                            <p>Choose Avatar</p>
                        </label>
                        <button type='submit'>Register</button>
                        {err && <span>{err}</span>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
