import react, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
function PostDetails(){
    const [postResults, setPostResults] = useState([]);
    const [commentsResults, setCommentsResults] = useState([]);
    const [testArr, setTestArr] = useState([]);

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
    //attempt 1
    // useEffect(() => {
    //     Promise.all([fetch1, fetch2])
    //     .then(([res1, res2]) => {
    //         Promise.all([res1.json(), res2.json()])
    //     })
    //     .then(([vals1, vals2]) => {
    //         console.log(vals1);
    //         console.log(vals2);
    //     })
    // }, [])
    
    //attempt2 -> sortof working
    // useEffect(() => {
    //     let arr = []
    //     let process = (prom) => {
    //         prom.then(data => {
                
                
               
                
                
    //             firstRes.push(data)
                
                
    //         })
    //     }

    //     Promise.all([fetch1, fetch2])
    //     .then(allResponses => {
    //         allResponses.forEach(file => {
    //             process(file.json())
    //         })
            
    //     })
    //     // console.log(firstRes)
    // }, [])
    // console.log(firstRes)


    //attempt3 
    // useEffect(() => {
        

    //     Promise.all([fetch1, fetch2])
    //     .then(allResponses => {
    //         // allResponses.forEach(file => {
    //         //     process(file.json())
    //         // })
    //         setFirstRes(allResponses[0].json());
    //         setSecondRes(allResponses[1].json());
    //     })
            
        
    //     console.log(firstRes);
    //     console.log(secondRes);
    // }, [])
    
        

       
        
    
    
    return (

        
        <div>
            post details test page
            {/* <p> {commentsResults[0].email} </p> */}
            
            {   <p> {postResults._id} </p> } 
            
            <p> The param id is {params.id}</p>

            

            {
                commentsResults.map((item, index) => {
                    let status = item.publish_status;

                    
                    return (
                        
                        <div key = {index} id = {item._id}>
                            <h3> New Comment </h3> 
                            <p> {item._id} </p> 
                            <p> {item.text} </p>
                         </div>
                    )
                    
                })
            }
            <button onClick = {handleSubmit}>
                Check results
            </button>
                 
        </div>
    )
}

export default PostDetails