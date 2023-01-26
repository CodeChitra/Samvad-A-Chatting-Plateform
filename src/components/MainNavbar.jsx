import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

function MainNavbar() {
    const { userData } = useContext(UserContext);
    return (
        <div className='mainNavbar'>
            <div className="peopleInfo">
                <span>{userData.user.displayName}</span>
            </div>
        </div>
    )
}

export default MainNavbar
