import React, {useState} from 'react';
import {Link} from  'react-router-dom';

function PostForm(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title);
        console.log(content);
        postCreation();
        setTitle('');
        setContent('');
    }

    const postCreation = () => {
        console.log('placeholder for now -- u clicked the submit button')
        let token = localStorage.getItem('accessToken');
        fetch('http://localhost:3000/post', {
            method: "POST",
            body: JSON.stringify({
                'title': title,
                'text': content,
                'comments': 'placeholder',
                'publish_status': false
            }),
            headers: {
                'Content-Type':'application/json',
                'Authorization': "Bearer " + token

            }
        })
    }

    return (
        <div>
            Form to create a new post
            <br/>
            <form>
                <label>
                    Title
                    <input 
                        type = "text"
                        placeholder = "Title of post"
                        onChange = {(e) => {
                            setTitle(e.target.value);
                        }}    
                    />
                        
                    

                </label>
                <br/>

                <label>
                    Content
                    <input 
                        type = "text"
                        placeholder = "Content body"
                        onChange = {(e) => {
                            setContent(e.target.value);
                        }}                        
                    />



                </label>

                <button onClick = {handleSubmit}>
                    Submit post
                </button>
            </form>
        </div>
    )

}

export default PostForm;