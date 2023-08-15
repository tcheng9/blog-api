import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Posts from "./components/Posts.jsx"
import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  const [count, setCount] = useState(0)

  return (

    
      <div>
        
          <Routes>              
          
                <Route path = "/posts" element = {<Posts/>} />
                <Route path = "/" element = {<Home/>} />
                <Route path = "/signup" element = {<Signup/>} />
                <Route path = "/login" element = {<Login/>} />
            </Routes>
      
          
         
      
        
          
        
          
          
        
  
      </div>
      

    
   
  )
}

export default App
