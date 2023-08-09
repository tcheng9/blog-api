import React from 'react';
import {Link} from 'react-router-dom';
function Home(){
    return (
        <div>
            This is the home page

            <Link to = "/poststests">
              Posts page
            </Link>

        </div>

        

    )
}

export default Home;