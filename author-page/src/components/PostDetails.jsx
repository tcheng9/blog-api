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
            setPostResults(data);
        })

        let getCommentsFetch = fetch(`http://localhost:3000/comment/match/${postId}`, {
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

    //promise.all attempt
    // useEffect(() => {

        

    //     let process = (prom) => {
    //         prom.then(data => {
    //             testArr.push(data)               
    //         })
    //     }

    //     Promise.all([getPostFetch, getCommentsFetch])
    //     .then(allResponses => {
    //         allResponses.forEach(file => {
    //             process(file.json())
    //         })
    //         return testArr
    //     }).then( data => {
    //         setPostResults(data);
    //         console.log(postResults)
    //         // let postFetchRes = data[0]
    //         // let commentsFetchRes = data[1]
            
    //         // // let postFetchRes2 = postFetchRes['post']

    //         // setPostResults(postFetchRes)
    //         // setCommentsResults(commentsFetchRes);

    //         // console.log(postResults);
    //         // console.log(commentsResults);
    //     })
    
            
    //     }, [])
        

       
        
    

    return (
        <div>
            post details test page
            {/* <p> {commentsResults[0].email} </p> */}
            
            <p> The param id is {params.id}</p>
                 
        </div>
    )
}

export default PostDetails