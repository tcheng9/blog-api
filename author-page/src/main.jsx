import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Routes, Route, Link, BrowserRouter} from "react-router-dom";
import Posts from "./components/Posts.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Routes>
          <Route path = "/poststests" element = {<Posts/>} />
          <Route path = "/" element = {<main/>} />
      </Routes>
  </BrowserRouter>

 
)
