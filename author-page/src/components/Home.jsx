import React from 'react';
import {Link} from 'react-router-dom';
function Home(){
    return (
        <div>
            This is the home page
            <br/>
            <Link to = "/poststests">
              Posts page
            </Link>
            <br/>
         
            <Link to = "/signup">
                Signup
            </Link>
            <br/>
            <Link to = "/login">
                Login
            </Link>
            <br/>
            <Link to = "/manageposts">
                Manage all posts
            </Link>
            <br/>
            <Link to = "/form">
                Create a new form
            </Link>
            <br/>
        </div>

        

    )
}

export default Home;