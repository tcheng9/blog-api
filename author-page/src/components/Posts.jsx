import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import './css/allposts.css';
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
            <h1> All posts</h1>
            <div>
                {
                    posts.map((item, index) => {
                        let max_substring;
                        if (item.length > 250){
                            max_substring = 250;
                        } else {
                            max_substring = item.text.length;
                        }
                        return (
                            
                            
                            <div>
                                
                                <div key = {index} id = {item._id} className = "postItem"> 
                                  

                                    
                                    <h1 className = 'postTitle'> 
                                        <Link to = {`/posts/${item._id}`}> {item.title} </Link>
                                    
                                    </h1>
                                    <p className = 'postText'> {item.text.substring(0, max_substring)} </p>
                                    {/* <form>
                                    
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
                                    </form> */}
                                    
                                </div>
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



/*

<div>
                                        {item.publish_status ? 
                                        (<div> test true </div>) : 
                                        (<div> test false </div>)

                                        }
                                </div>
                            

*/