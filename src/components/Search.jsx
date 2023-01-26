import { collection, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where, doc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext';
import { db } from '../firebase/firebase';

function Search() {
    const [userName, setUserName] = useState("");
    const [users, setUsers] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);
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

    const handleClickOnUser = async (e) => {

        const user = users[e.target.id];
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists())
            await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create userChats

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL
            },
            [combinedId + ".date"]: serverTimestamp()
        })
        await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL
            },
            [combinedId + ".date"]: serverTimestamp()
        })
        setUsers(null);
    }
    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text" placeholder='Seacrh Here' onKeyDown={handleEnter} onChange={handleChange} value={userName} />
            </div>
            {err && <span>User Not Found!</span>}
            {users && users.map((user, index) => <div className="userChat" key={index} id={index} onClick={handleClickOnUser}>
                <img src={user.photoURL} alt="" />
                <div className="userInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>)}
        </div>
    )
}

export default Search
