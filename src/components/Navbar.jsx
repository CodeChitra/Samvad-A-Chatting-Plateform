import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import AuthContext from '../context/AuthContext'
function Navbar() {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className='navbar'>
            <div className="logo">
                Samvad
            </div>
            <div className="userProfile">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}><span>logout</span></button>
            </div>
        </div>
    )
}

export default Navbar
