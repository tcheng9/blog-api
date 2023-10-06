import react, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import './css/postdetails.css';
function PostDetails(){
    const [postResults, setPostResults] = useState([]);
    const [commentsResults, setCommentsResults] = useState([]);
    const [testArr, setTestArr] = useState([]);
    const [comment, setComment] = useState([]);
    const [commentPostId, setCommentPostId] = useState('');


    const params = useParams();
    let postId = params.id;
    let token = localStorage.getItem('accessToken');
    let getPostFetch = fetch(`http://localhost:3000/post/${postId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    let getCommentsFetch = fetch(`http://localhost:3000/comment/match/${postId}`, {
        method:'GET',
        headers:{
            'Authorization': 'Bearer ' + token
        }
    });
    

    //trying to call each fetch independent of each other
    useEffect(() => {
        fetch(`http://localhost:3000/post/${postId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setPostResults(data['post']);
            console.log(postResults);
        })

        fetch(`http://localhost:3000/comment/match/${postId}`, {
            method:'GET',
            headers:{
                'Authorization': 'Bearer ' + token
            }
         })
         .then(res => {
            return res.json();
         })
         .then(data => {
            setCommentsResults(data['comments']);
            console.log(commentsResults)
          
         })

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postResults);
        console.log(commentsResults);
    }

    //Testing Promise.All()
    let fetch1 = fetch('http://localhost:3000/post', {
            
            method:"GET",
            headers: {
                'Authorization': "Bearer " + token
            }
        });
    let fetch2 = fetch('http://localhost:3000/post', {
            
            method:"GET",
            headers: {
                'Authorization': "Bearer " + token
            }
    })

    //Code to submit comment form
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        commentsCall();
        console.log(comment);
        console.log(postId)
        setComment('');
        setCommentPostId('');
        
        
    }
  //Function to run fetch api call
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
          
            <div className = 'postSection'>
                {/* <p> {commentsResults[0].email} </p> */}
            
                {   
                    <div>

                        <h1> {postResults.title} </h1> 
                        <p> {postResults.text} </p> 
                    </div>
                } 
                
                {/* <p> The param id is {params.id}</p> */}
                
            </div>
            

            <div className = 'commentsSection'>
                <div className = 'commentsCenter'>

                
                    <form>
                                        
                        <input 
                            id = {params._id}
                            type = "text"
                            placeholder = "New comment here!"
                            onChange = {(e) => {
                                setComment(e.target.value);
                                setCommentPostId(e.target.id);
                            }}
                        >
                        
                        </input>
                        <button onClick = {handleCommentSubmit}>
                            Submit comment!
                        </button>
                    </form>
                    {
                        commentsResults.map((item, index) => {
                            let status = item.publish_status;

                            
                            return (
                                
                                <div className = 'comments' key = {index} id = {item._id}>
                                    <h3> New Comment </h3> 
                                
                                    <p> {item.text} </p>
                                </div>
                            )
                            
                        })
                    }
                </div>
                
            </div>

            
                 
        </div>
    )
}

export default PostDetails