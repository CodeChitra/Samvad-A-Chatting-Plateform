import React from 'react'
import Mainbar from '../components/Mainbar'
import Sidebar from '../components/Sidebar'
import "./styles/Home.scss";
function Home() {
    return (
        <div className='home'>
            <div className="wrapper">
                <Sidebar />
                <Mainbar />
            </div>
        </div>
    )
}

export default Home
