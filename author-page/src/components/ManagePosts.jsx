import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function ManagePosts(){
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState('');
    const [publishStatus, setPublishStatus] = useState(false);
    let token = localStorage.getItem('accessToken');
    let newPublishStatus;
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
    
    function showPost(id){
        //funtion to show the post -> publish_status = true
        fetch(`http://localhost:3000/post/` + id, {
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

    function hidePost(id){
        //funtion to hide the post -> publish_status = false
        fetch(`http://localhost:3000/post/` + id, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "publish_status": false
            })
        })
    }
    
    

    const showPostButton = (e) => {
        //Use this button to show a post
        e.preventDefault();
        console.log('turn on');
        
        
     
        showPost(e.target.id);
      
        window.location.reload(false);
        
    }

    const hidePostButton = (e) => {
        //Use this button to hide a post
        e.preventDefault();
        console.log('turn off');
        
        hidePost(e.target.id);
        window.location.reload(false);
       
        
        
        
    }

    return (
        <div>
            {
                posts.map((item, index) => {
                    
                
                    return (
                        <div key = {index} id = {item._id}>
                            <h1> {item.title} </h1>
                            <p> {item.publish_status} </p>
                            <p> {item._id}</p>
                            <p> --------- end of post -----------</p>

                            <form>
                                <input 

                                />
                            </form>

                            <div> 
                                {item.publish_status ? 
                                    (<button id = {item._id} onClick = {hidePostButton}>
                                        Unpublish
                                    </button>) : 
                                    (<button id = {item._id}  onClick = {showPostButton}>
                                        Publish
                                    </button>)
                                }
                            {/* <button id = {item._id} onClick = {handleSubmit}>
                                log all posts
                            </button> */}

                            </div>
                            
                        </div>
                        

                    )
                })
            }
            
        </div>
        
        
    )
}

export default ManagePosts;

/*

<div>
                                        {item.publish_status ? 
                                        (<div> test true </div>) : 
                                        (<div> test false </div>)

                                        }
                                </div>
                            

*/