import React from 'react';
import {useEffect, useState} from 'react';


function Auth() {
    const [username, setUsername] = useState({username: ''});
    const [password, setPassword] = useState({password: ''});


    // let handleSignup = async (e) => {
    //     e.preventDefault();
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({
    //           username: username,
    //           password: password,
    //         })
    //       };

        
    //     console.log('submitting sign up form');

    //     fetch('http://localhost:3000/auth/signup', requestOptions)
    //     .then((response) => response.json())
    //     .then((json) => {
    //         console.log(json)}
             
    //     ); 
    // } 
    
    
  const submit = e => {
    e.preventDefault();
    
  }
  
    
   


  function signUp(){
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: 'website1',
        password: 'website1',
      })
    };
    
    fetch("http://localhost:3000/auth/signup", requestOptions)
      .then((response) => response.json())
      .then((json) => { console.log(json)});
  }

  function login(){
    console.log('login button pressed');
  }

  return (
     <div>
        <h1> Sign Up </h1>
        <form id = "signup">
          <label htmlFor = "username"> Username: </label> <br/>
          <input type = "text"  id = "username" name = "username" onChange={(e) => setUsername({text: e.target.value})} /> <br/>

          <label htmlFor = "password"> Password: </label> <br/>
          <input type = "text" id = "password" name = "password"/> <br/>

          <button onClick = {signUp()}> Sign Up </button> 
        </form>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>



        <form id = "login">
          <h1> Login Form </h1>
          <label htmlFor = "username"> Username: </label> <br/>
          <input type = "text"  id = "username" name = "username"/> <br/>

          <label htmlFor = "password"> Password: </label> <br/>
          <input type = "text" id = "password" name = "password"/> <br/>

          <button onClick = {login()}> Log Up </button> 
        </form>


    </div>
  )
}


export default Auth