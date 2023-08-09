import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Posts from "./components/Posts.jsx"
import Home from "./components/Home";
function App() {
  const [count, setCount] = useState(0)

  return (

    
      <div>
        
          <Routes>              
          
                <Route path = "/poststests" element = {<Posts/>} />
                <Route path = "/" element = {<Home/>} />
            </Routes>
      
          
         
      
        
          
        
          
          
        
  
      </div>
      

    
   
  )
}

export default App
