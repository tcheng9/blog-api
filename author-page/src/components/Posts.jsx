import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';

function Posts(){
    return (
        <div>
            <p> Posts page </p>
            <Link to = "/">
              home page
          </Link>

        </div>

        
    );
}

export default Posts;