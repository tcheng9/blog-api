import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';

//This is the page that loads all posts

function Posts(){
    
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState([]);

    let token = localStorage.getItem('accessToken');
    useEffect(()=> {
    
        fetch('http://localhost:3000/post', {
            
            method:"GET",
            headers: {
                'Authorization': "Bearer " + token
            }
        })
        .then(res =>{
            return res.json();
        })
        .then(data => {
            setPost(data);
        })
        .catch((err) => console.log(err));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(comment);
        setComment('');
    }
  
    const commentsCall = () => {
        
    }
    return (
        <div>
            <p> Posts page </p>
            <div>
                {
                    post.map((item, index) => {
                        return (
                            
                            <div key = {index} id = {item._id} > 
                                <h1> {item.title} {index} </h1>
                                
                                    {item.text}
                                    <form>
                                        <input 
                                            type = "text"
                                            placeholder = "New comment here!"
                                            onChange = {(e) => {
                                                setComment(e.target.value);
                                            }}
                                        >
                                        
                                        </input>
                                        <button onClick = {handleSubmit}>
                                            Submit comment!
                                        </button>
                                    </form>
                            
                            </div>
                            
                        )
                    })
                }
            </div>
            
            
            <Link to = "/">
              home page
            </Link>

        </div>

        
    );
}

export default Posts;