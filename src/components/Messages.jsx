import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import { db } from '../firebase/firebase';
import Message from './Message'

function Messages() {
    const [messages, setMessages] = useState([]);
    const { userData } = useContext(UserContext);
    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", userData.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unsub();
        }
    }, [userData.chatId])
    return (
        <div className='messages'>
            {messages.map(m => <Message message={m} key={m.id} />)}
        </div>
    )
}

export default Messages
