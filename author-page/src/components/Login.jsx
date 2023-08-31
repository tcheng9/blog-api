import react, {useState} from 'react';
import {Link} from 'react-router-dom';
import './css/login.css'
function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) =>{
        e.preventDefault();
        
        
        postLoginDetails();
        setUsername('');
        setPassword('');
        console.log(username);
        console.log(password);
        
    }

    const postLoginDetails = () => {
        fetch('http://localhost:3000/auth/login', {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
        .then((data) => {
            let token = data['accessToken'];
            if (token){
                localStorage.setItem('accessToken', token);
            }
            console.log(data['accessToken']);
            
        })
        .catch((err) => console.error(err));
    }
    //localStorage.setItem('test', 'test1') -> set a value in local storage
            //localStorage.getItem('test') -> get a value in local storage 
        
    return (
        <body>
            <div className = 'login'>
                
                
                <form className = 'form'>
                    <h1> Login page </h1>
                    <br/>
                    <div className = 'input-box'>
                        <input             
                            type = "text"
                            placeholder = "username"
                            name = "username"
                            onChange = {(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className = 'input-box'>

                        <input 

                            type = "text"
                            placeholder = "password"
                            name = "password"
                            onChange = {(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    
                    </div>
                    
                    <button
                        className = 'login-btn'
                        name = "login"
                        onClick = {handleLogin}
                    >
                        Login
                    </button>
                        
                    <div className = 'register-link'>
                        <p> Don't have an account?             
                            <Link className = 'signupLink' to = "/signup">
                                Signup    
                            </Link>
                        </p>
                    </div>
                </form>


                
                {/* <Link to = "/">
                    Home    
                </Link> */}
            </div>
        </body>
    )
}

export default Login;