import React, { useEffect, useState } from 'react'


function FetchApi(){
    const [data, setData] = useState([]);

    const apiGet = () => {
        fetch('http://localhost:3000/comment')
        .then((response)  => response.json())
        .then((json) => {
            console.log(json);
            setData(json);
        
    })} ;
    

    useEffect(() => {
        apiGet();
    }, [])

    return (
        <div>
            <p>
                Testig fet api js page

                <button onClick = {apiGet}> Fetch API </button>
            </p>

            <div>
                <ul>
                    {data.map(item => {
                        return <li> {item.text}, {item.email} </li>
                        
                        
                    })}
                </ul>
            </div>
        </div>
    )
}



export default FetchApi