import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function ManagePosts(){
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState('');
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
            
            setPosts(data);
            
        })
        .catch((err) => console.log(err));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setPostId(e.target.id);

      

        updatePubStatus();
        
        
    }
    
    function updatePubStatus(){
        fetch(`http://localhost:3000/post/${postId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "publish_status": true
            })
        })
    }

    return (
        <div>
            {
                posts.map((item, index) => {
                    return (
                        <div key = {index} id = {item._id}>
                            <h1> {item.title} </h1>
                            <p> --------- end of post -----------</p>

                            <form>
                                <input 

                                />
                            </form>

                            <button id = {item._id} onClick = {handleSubmit}>
                                log all posts
                            </button>
                        </div>
                        

                    )
                })
            }
            
        </div>

        
    )
}

export default ManagePosts;