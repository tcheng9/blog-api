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

    useEffect(() => {
        let process = (prom) => {
            prom.then(data => {
                testArr.push(data)               
            })
        }

        Promise.all([getPostFetch, getCommentsFetch])
        .then(allResponses => {
            allResponses.forEach(file => {
                process(file.json())
            })
            // let postFetchRes = testArr[0]
            // let commentsFetchRes = testArr[1]
            
            // let postFetchRes2 = postFetchRes['post']

            // setPostResults(postFetchRes2)
            // // setCommentsResults(commentsFetchRes['comments']);

            setPostResults(testArr);
            console.log(testArr);
        })
        

       
    }, [])
    

    return (
        <div>
            post details test page
            
            {/* <p> {postResults._id} </p> */}
            <p> The param id is {params.id}</p>
                 
        </div>
    )
}

export default PostDetails