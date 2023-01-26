import React from 'react'

function Input() {
    return (
        <div className='input'>
            <input type="text" placeholder='Type here...' />
            <div className="send">
                <input type="file" id='photo' style={{ display: "none" }} />
                <label htmlFor="photo">
                    <img src="https://cdn-icons-png.flaticon.com/512/2356/2356589.png" alt="" />
                    <img src="https://cdn-icons-png.flaticon.com/512/739/739249.png" alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input
