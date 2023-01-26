import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase/firebase';

function Search() {
    const [userName, setUserName] = useState("");
    const [users, setUsers] = useState(null);
    const [err, setErr] = useState(false);
    const handleChange = (e) => {
        setUserName(e.target.value);
    }

    const searchUser = async () => {

        try {
            const colRef = collection(db, "users");
            const q = query(colRef, where("displayName", "==", userName))
            const res = await getDocs(q);
            if (res.docs.length === 0)
                throw new Error("User Not Found!")
            const temp = [];
            res.forEach((doc) => {
                temp.push(doc.data())
            });
            setUsers(temp);
        }
        catch (error) {
            setErr(true);
        }
        setUserName("");
        // setErr(false);

    }

    const handleEnter = (e) => {
        setErr(false);
        e.code === "Enter" && searchUser();
    }

    const handleClickOnUser = () => {
        setUsers(null);
    }
    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text" placeholder='Seacrh Here' onKeyDown={handleEnter} onChange={handleChange} value={userName} />
            </div>
            {err && <span>User Not Found!</span>}
            {users && users.map((user, index) => <div className="userChat" key={index} onClick={handleClickOnUser}>
                <img src={user.photoURL} alt="" />
                <div className="userInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>)}
        </div>
    )
}

export default Search
