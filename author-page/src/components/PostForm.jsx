import React, {useState} from 'react';
import {Link} from  'react-router-dom';

function PostForm(){
    const [title, setTitle] = useState('');
    const [content, setcontent] = useState('');
    return (
        <div>
            Form to create a new post
            <form>
                <label>
                    Title
                    <input type = "text">
                        
                    </input>

                </label>
                

                <label>
                    Content
                    <input type = "text">

                    </input>

                </label>
            </form>
        </div>
    )

}

export default PostForm;