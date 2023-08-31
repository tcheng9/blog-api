import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './css/signup.css'
function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(password);
        postSignUpDetails();
        setUsername('');
        setPassword('');
    }

    const postSignUpDetails = () => {
        fetch('http://localhost:3000/auth/signup', {
            method:"POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                "Content-Type":'application/json',
            },
        }).then((res) => res.json)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.error(err));
    }
    

    

    return (
        <body>
            <div className = 'wrapper'>
                <form className = 'signup-form'>
                    <h1> Sign up page </h1>
                    <div className = 'input-box'>
                        <input 
                    
                        type = "text" 
                        placeholder = "Enter username" 
                        name = "username" 
                        onChange = {(e) =>{
                            setUsername(e.target.value);
                        }}

                    />
                    
                    </div>
                    
                    <div className = 'input-box'>
                        <input 
                           
                            type = "text" 
                            placeholder = "Enter password" 
                            name = "password"
                            onChange = {(e) => {
                                setPassword(e.target.value);
                            }}   
                         />
                    </div>
                        
                    

                    
                    
                         <button className = 'submit-btn' onClick = {handleSubmit} > 
                            Submit
                        </button>
                    
                    <div className = 'login'>
                        <p> Already have an account? <Link className = 'login-link' to = "/login">
                            Home    
                        </Link>

                        </p>
                    </div>
                </form>
            </div>

        </body>
        
    )
}


export default Signup