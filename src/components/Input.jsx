import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import UserContext from '../context/UserContext';
import { v4 as uuid } from "uuid";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase/firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
function Input() {
    const [text, setText] = useState("");
    const [img, setImg] = useState("");
    const { currentUser } = useContext(AuthContext);
    const { userData } = useContext(UserContext);

    const handleSendText = (e) => {
        setText(e.target.value);
    }
    const handleSendImage = e => {
        setImg(e.target.files[0]);
    }

    const handleSendMessage = async () => {
        if (text !== "") {

            if (img) {
                const storageRef = ref(storage, uuid());

                const uploadTask = uploadBytesResumable(storageRef, img);

                uploadTask.on('state_changed',
                    (snapshot) => {

                    },
                    (error) => {
                        console.log(error.message);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            try {
                                await updateDoc(doc(db, "chats", userData.chatId), {
                                    messages: arrayUnion({
                                        id: uuid(),
                                        text,
                                        senderId: currentUser.uid,
                                        date: Timestamp.now(),
                                        img: downloadURL
                                    })
                                })
                            }
                            catch (err) {
                                console.log("Error ,", err.message);
                            }

                        });
                    }
                );
            }
            else {
                await updateDoc(doc(db, "chats", userData.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now()
                    })
                })
            }
            await updateDoc(doc(db, "userChats", currentUser.uid), {
                [userData.chatId + ".lastMessage"]: {
                    text
                },
                [userData.chatId + ".data"]: serverTimestamp()
            })
            await updateDoc(doc(db, "userChats", userData.user.uid), {
                [userData.chatId + ".lastMessage"]: {
                    text
                },
                [userData.chatId + ".data"]: serverTimestamp()
            })
            setText("");
            setImg(null);
        }
    }

    const handlePressEnter = (e) => {
        e.code === "Enter" && handleSendMessage();
    }
    return (
        <div className='input'>
            <input type="text" placeholder='Type here...' onChange={handleSendText} onKeyDown={handlePressEnter} value={text} />
            <div className="send">
                <input type="file" id='photo' style={{ display: "none" }} onChange={handleSendImage} />
                <label htmlFor="photo">
                    <img src="https://cdn-icons-png.flaticon.com/512/2356/2356589.png" alt="" />
                    <img src="https://cdn-icons-png.flaticon.com/512/739/739249.png" alt="" />
                </label>
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Input
