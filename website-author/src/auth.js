import React from 'react';
import {useState} from 'react';


function Auth() {
  
  const [data, setData] = useState({
    username: '',
    password:'',
    
  })

  // function signup(){
  //   console.log('signup button is pressed');
  // }
  
  function handle(e) {
    const newData = {...data};
    newData[e.target.id] = e.target.value
    setData(newData)
    // console.log(newData);
  }

  function submit(e){
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

      // .then(data => this.setState({postId: data.id})
  }

  // function login(){
  //   console.log('login button pressed');
  // }

  return (
     <div>
        <h1> Sign Up </h1>
        <form id = "signup">
          <label htmlFor = "username"> Username: </label> <br/>
          <input onChange={(e) => handle(e)} value = {data.username} type = "text"  id = "username" name = "username"/> <br/>

          <label htmlFor = "password"> Password: </label> <br/>
          <input onChange={(e) => handle(e)} value = {data.password} type = "text" id = "password" name = "password"/> <br/>

          <button onClick = {submit}> Sign Up </button> 
        </form>

{/*      
        <form id = "login">
          <h1> Login Form </h1>
          <label htmlFor = "username"> Username: </label> <br/>
          <input onChange={(e) => handle(e)} value = {data.username} type = "text"  id = "username" name = "username"/> <br/>

          <label htmlFor = "password"> Password: </label> <br/>
          <input onChange={(e) => handle(e)} value = {data.password} type = "text" id = "password" name = "password"/> <br/>

          <button onClick = {login()}> Log Up </button> 
        </form> */} 

    </div>
  )
}


export default Auth