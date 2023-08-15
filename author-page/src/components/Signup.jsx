import React, {useState} from 'react';
import {Link} from 'react-router-dom';
function Signup(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    let handleSubmit = (e) => {
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
        <div>
            Sign up page
            <Link to = "/">
                Home    
            </Link>

            <form name = "signupForm">
                
                <input 
                    type = "text" 
                    placeholder = "Enter username" 
                    name = "username" 
                    onChange = {(e) =>{
                        setUsername(e.target.value);
                    }}

                />
                
                
                    
                

                <input 
                    type = "text" 
                    placeholder = "Enter password" 
                    name = "password"
                    onChange = {(e) => {
                        setPassword(e.target.value);
                    }}   
                />
                    
                <button onClick = {handleSubmit} > 

                    Sign up
                </button>
            </form>

            
        </div>
    )
}


export default Signup