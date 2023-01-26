import React from 'react'
import Navbar from './Navbar'
import People from './People'
import Search from './Search'

function Sidebar() {
    return (
        <div className='sidebar'>
            <Navbar />
            <Search />
            <People />
        </div>
    )
}

export default Sidebar
