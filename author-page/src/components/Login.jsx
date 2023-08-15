import react, {useState} from 'react';
import {Link} from 'react-router-dom';

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
        }).then((res) => res.json)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => console.error(err));
    }
    
    return (
        <div>
            Login page;
            <form>
                <input 
                    type = "text"
                    placeholder = "username"
                    name = "username"
                    onChange = {(e) => {
                        setUsername(e.target.value);
                    }}
                />

                <input 
                    type = "text"
                    placeholder = "password"
                    name = "password"
                    onChange = {(e) => {
                        setPassword(e.target.value);
                    }}
                />

                <button
                    name = "login"
                    onClick = {handleLogin}
                >
                    Login
                </button>
            
            </form>


            
            <Link to = "/">
                Home    
            </Link>
        </div>
    )
}

export default Login;