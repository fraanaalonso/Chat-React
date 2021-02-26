import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app';
import { Message } from './Message';

const Channel = ({user=null, db=null}) => {
    const [messages, setmessages] = useState([]);
    const [newMessage, setnewMessage] = useState('');
    const { uid, displayName, photoURL }= user;
    useEffect(() => {
        if( db ){
            const unsuscribe = db
                .collection('messages')
                .orderBy('CreatedAt')
                .limit(100)
                .onSnapshot(querySnapshot => {
                                    const data = querySnapshot.docs.map(doc => ({
                                        ...doc.data(),
                                        id: doc.id,
                                    }))

                                    setmessages(data);
                                });
                return unsuscribe
        }
    }, [db]);

    const handleOnChange = (e) => {
        setnewMessage(e.target.value);
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if( db ){
            db.collection('messages').add({

                text: newMessage,
                CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            }
            )
        }

        setnewMessage('');
    }

    return (
    <>
        <div className="flex flex-col h-full">
            <ul>
                {messages.map( message => (
                    <li key={message.id}><Message {...message} /></li>
                ))}
            </ul>
            <div className="mb-6 mx-4">
                <form
                className="flex flex-row bg-gray-200 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md"
                onSubmit={ handleSubmit }>
                    <input
                        className="flex-1 bg-transparent outline-none"
                        value={newMessage}
                        onChange={handleOnChange}
                        placeholder="Escribe aquí tu mensaje"
                    />

                    <button className="uppercase font-semibold text-sm tracking-wider text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors" type="submit" disabled={!newMessage}>Enviar</button>

                </form>
            </div>
        </div>
    </>
    );
}

export default Channel;
