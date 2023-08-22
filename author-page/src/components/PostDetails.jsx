import react, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
function PostDetails(){
    const params = useParams();
    return (
        <div>
            post details test page
            <p> The param id is {params.id}</p>
                 
        </div>
    )
}

/*

*/
export default PostDetails