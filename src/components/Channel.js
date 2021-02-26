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
    }

    return (
    <>
        <ul>
            {messages.map( message => (
                <li key={message.id}><Message {...message} /></li>
            ))}
        </ul>

        <form onSubmit={ handleSubmit }>
            <input
                type="text"
                value={newMessage}
                onChange={handleOnChange}
                placeholder="Escribe aquí tu mensaje"
            />

            <button type="submit" disabled={!newMessage}>Enviar</button>

        </form>
    </>
    );
}

export default Channel;
