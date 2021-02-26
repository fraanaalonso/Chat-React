import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Button from './components/Button';
import './index.css'
import  Channel  from './components/Channel';

firebase.initializeApp({
    apiKey: "AIzaSyAX_zpDqGSxQnLWGRdCKMk8AM_XSbqOF5o",
    authDomain: "chat-react-edc32.firebaseapp.com",
    projectId: "chat-react-edc32",
    storageBucket: "chat-react-edc32.appspot.com",
    messagingSenderId: "891470607365",
    appId: "1:891470607365:web:c8791fd0fe9d58526b586c",
    measurementId: "G-MGDN3L6V8R"
});
const auth = firebase.auth();
const db = firebase.firestore();


function App() {

  const [user, setuser] = useState(()=> auth.currentUser)
  const [initializing, setinitializing] = useState(true)
  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged( user => {
      if ( user ){
        setuser( user );
      }else{
        setuser( null );
      }

      if ( initializing ){
        setinitializing( false );
      }
    })

    return unsuscribe;
  })
  const signInWithGoogle =async() => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();

    try{
      await auth.signInWithPopup(provider);
    }catch(error){
      console.log( error );
    }
  };

  const signOut = async() => {
    try{
      await firebase.auth().signOut();
    }catch(error){
      console.log( error.message );
    }
  };


  if( initializing ) return 'Loading...';

  return (
    <div className="App">
      {user 
      
      ? 
      
      <>
        <Button  onClick={signOut}>Cerrar Sesión</Button>
        <Channel user={user} db={db} />
      </>
      
      : 
      
      <Button  onClick={signInWithGoogle}>Inicia Sesión con Google</Button>}
    </div>
  );
}

export default App;
