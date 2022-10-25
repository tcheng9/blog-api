import React from 'react';
import {useEffect, useState} from 'react';


function Auth() {
  
  const [data, setData] = useState({
    username: '',
    password:'',
    
  })

  
  
  function handle(e) {
    const newData = {...data};
    newData[e.target.id] = e.target.value
    setData(newData)
    console.log(newData);
  }

  function signupSubmit(e){
    e.preventDefault();
    
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }

    console.log(data);
    

    fetch('http://localhost:3000/auth/signup', requestOptions)
    .then((data) => {
      console.log(data);
    })

     
  }

  /////////////////
  const [loginData, setLoginData] = useState({
    username: '',
    password:'',
  })

  function handleLogin(e) {
    const newData = {...loginData};
    newData[e.target.id] = e.target.value
    setLoginData(newData)
    // console.log(newData);
  }


  function loginSubmit(e) {
    e.preventDefault();   
    console.log(loginData);

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(loginData)
    }

    
    fetch('http://localhost:3000/auth/login', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.accessToken);
      localStorage.setItem('token', JSON.stringify(data.accessToken));
    })
    
    
    // .then((data) => {
    //   console.log(data);
    //   })  
  }

  //Trying to make API call with token attached

  const apiGet = () => {
    
    fetch('http://localhost:3000/comment', {
      headers:{Authorization: localStorage.getItem('token')}
    })
    .then((response)  => console.log(response.json()))
    .then((json) => {
        console.log(json);
        
        // setData(json);
    })
  } ;


  // useEffect(() => {
  //     apiGet();
  // }, [])

  return (
     <div>
        <h1> Sign Up </h1>
        <form id = "signup">
          <label htmlFor = "username"> Username: </label> <br/>
          <input onChange={(e) => handle(e)} value = {data.username} type = "text"  id = "username" name = "username"/> <br/>

          <label htmlFor = "password"> Password: </label> <br/>
          <input onChange={(e) => handle(e)} value = {data.password} type = "text" id = "password" name = "password"/> <br/>

          <button onClick = {signupSubmit}> Sign Up </button> 
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
          <input onChange={(e) => handleLogin(e)} value = {loginData.username} type = "text"  id = "username" name = "username"/> <br/>

          <label htmlFor = "password"> Password: </label> <br/>
          <input onChange={(e) => handleLogin(e)} value = {loginData.password} type = "text" id = "password" name = "password"/> <br/>

          <button onClick = {loginSubmit}> Log Up </button> 
        </form>

        <div id = "getComment">

        </div>

      <div>
        <button onClick = {apiGet}>
          Get comments
        </button>
      </div>
    

    </div>
  )
}


export default Auth