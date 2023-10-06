import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Posts from "./components/Posts.jsx"
import Home from "./components/Home";
import Login from './components/Login';
import Signup from './components/Signup';
import PostForm from "./components/PostForm"
import ManagePosts from './components/ManagePosts';
import PostDetails from './components/PostDetails';
function App() {
  const [count, setCount] = useState(0)

  return (

    
      <div>
          <HashRouter basename = "/">
             <Routes>              
          
                <Route path = "/posts" element = {<Posts/>} />
                <Route path = "/" element = {<Home/>} />
                <Route path = "/signup" element = {<Signup/>} />
                <Route path = "/login" element = {<Login/>} />
                <Route path = "/form" element = {<PostForm/>} />
                <Route path = "/manageposts" element = {<ManagePosts/>}/>
                <Route path = "/posts/:id" element = {<PostDetails/>}/>
            </Routes>
      
          </HashRouter>
         
          
         
      
        
          
        
          
          
        
  
      </div>
      

    
   
  )
}

export default App
