import React from 'react'

function FetchApi(){

    const apiGet = () => {
        fetch('http://localhost:3000/comment')
        .then((response)  => response.json())
        .then((json) => console.log(json));
    }

    return (
        <div>
            <p>
                Testig fet api js page

                <button onClick = {apiGet}> Fetch API </button>
            </p>
        </div>
    )
}


export default FetchApi