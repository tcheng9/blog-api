import React, {useState} from 'react';
import {Link} from  'react-router-dom';
import './css/comment-form.css';

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
            <h1 className = 'formTitle'> Form to create a new post </h1>
            <br/>
            <form className = 'formWrapper'>
                <div>

                
                    <label className = 'formLabel'>
                        
                        <input 
                            type = "text"
                            placeholder = "Title of post"
                            className = 'formTitle'
                            onChange = {(e) => {
                                setTitle(e.target.value);
                            }}    
                        />
                            
                        

                    </label>
                </div>
                <br/>

                <label className = 'formLabel'>
                    
                    <input 
                        type = "text"
                        className = 'formBody'
                        placeholder = "Content body"
                        onChange = {(e) => {
                            setContent(e.target.value);
                        }}                        
                    />



                </label>
                <br></br>
                <button className = 'formSubmit' onClick = {handleSubmit}>
                    Submit post
                </button>
            </form>
        </div>
    )

}

export default PostForm;