import React from 'react'

function Navbar() {
    return (
        <div className='navbar'>
            <div className="logo">
                Fire Chat
            </div>
            <div className="userProfile">
                <img src="https://www.mykhel.com/thumb/247x100x233/cricket/players/8/3788.jpg" alt="" />
                <span>Akash</span>
                <button><span>logout</span></button>
            </div>
        </div>
    )
}

export default Navbar
