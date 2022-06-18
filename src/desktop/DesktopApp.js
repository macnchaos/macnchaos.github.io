import React, {useState} from "react";
import './DesktopApp.css';
import './NeonSign.css';
import './components/Comment.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Blog from "./pages/Blog";
import DesktopNavbar from "./pages/DesktopNavbar";
import {onAuthStateChanged} from "firebase/auth";
import { auth } from "../firebase-config";


function DesktopApp() {
  const [isAuth,setIsAuth] = useState(false);
  
  onAuthStateChanged(auth,(user)=>{
    if(user){
      setIsAuth(true);
    }else{
      localStorage.clear();
      setIsAuth(false);
    }
  })

  
  return (
    <Router>
      <DesktopNavbar isAuth={isAuth} setIsAuth={setIsAuth} />
      <p class="link">Mayank Chaturvedi</p>
      <Routes>
        <Route path = "/" element={<Home isAuth={isAuth}/>} />
        <Route path = "/createpost" element={<CreatePost isAuth={isAuth}/>} />
        <Route path = "/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path = "/posts/:id" element={<Posts isAuth={isAuth}/>} />
        <Route path = "/posts" element={<Blog isAuth={isAuth}/>} />
        <Route path = "/blog" element={<Blog isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}

export default DesktopApp;
