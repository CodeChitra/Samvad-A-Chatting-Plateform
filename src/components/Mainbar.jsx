import React from 'react'
import Input from './Input'
import MainNavbar from './MainNavbar'
import Messages from './Messages'

function Mainbar() {
    return (
        <div className='mainbar'>
            <MainNavbar />
            <Messages />
            <Input />
        </div>
    )
}

export default Mainbar
