

function App() {
    const 
  function signUp(){
    fetch("POST http://localhost:3000/auth/signup")
      .then((response) => response.json())
      .then((json) => {
        
      }
  }

  function login(){
    console.log('login button pressed');
  }

  return (
     <div>
        <h1> Sign Up </h1>
        <form id = "signup">
          <label htmlFor = "username"> Username: </label> <br/>
          <input type = "text"  id = "username" name = "username"/> <br/>

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

export default App;
