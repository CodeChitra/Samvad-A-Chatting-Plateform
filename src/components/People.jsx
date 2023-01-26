import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext';
import UserContext from '../context/UserContext';
import { db } from '../firebase/firebase'

function People() {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(UserContext);
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), doc => {
                setChats(doc.data());
            })

            return () => {
                unsub();
            }
        }

        currentUser.uid && getChats();
    }, [currentUser.uid])
    const chatsArray = Object.entries(chats);
    const handleCLickOnUser = (user) => {
        dispatch({ type: "USER_CHANGED", payload: user });
    }
    return (
        <div className='people'>
            {chatsArray?.sort((a, b) => b[1].date - a[1].date).map((chat, index) => <div className="userChat" key={index} onClick={() => handleCLickOnUser(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userInfo">
                    <span>{chat[1].userInfo.displayName}</span>
                    <p>{chat[1].lastMessage?.text}</p>
                </div>
            </div>)}
        </div>
    )
}

export default People
