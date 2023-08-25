import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';

//This is the page that loads all posts

function Posts(){
    
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState([]);
    const [postId, setPostId] = useState('');


    let token = localStorage.getItem('accessToken');
    

    
    //ORIGINAL USEEFFECT
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
            
            setPosts(data);
            
        })
        .catch((err) => console.log(err));
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        commentsCall();
        console.log(comment);
        console.log(postId)
        setComment('');
        setPostId('');
        
        
    }
  
    const commentsCall = () => {
       
        fetch('http://localhost:3000/comment', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: comment,
                postId: postId
            })
        })
    }

    return (
        <div>
            <p> Posts page </p>
            <div>
                {
                    posts.map((item, index) => {
                        return (
                            
                            <div key = {index} id = {item._id} > 
                                <h1> {item.title} {index} </h1>
                                
                                {item.text}
                                
                                <Link to = {`/posts/${item._id}`}>link </Link>

                                <form>
                                
                                    <input 
                                        id = {item._id}
                                        type = "text"
                                        placeholder = "New comment here!"
                                        onChange = {(e) => {
                                            setComment(e.target.value);
                                            setPostId(e.target.id);
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


