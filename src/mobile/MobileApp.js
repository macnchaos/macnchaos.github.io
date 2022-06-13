import React, {useState} from "react";
import './MobileApp.css';
import './NeonSign.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import HamburgerMenu from "./pages/HamburgerMenu";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Blog from "./pages/Blog";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function MobileApp() {
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
      <HamburgerMenu isAuth={isAuth} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/createpost" element={<CreatePost isAuth={isAuth}/>} />
        <Route path = "/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path = "/posts/:id" element={<Posts isAuth={isAuth}/>} />
        <Route path = "/posts" element={<Blog isAuth={isAuth}/>} />
        <Route path = "/blog" element={<Blog isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}

export default MobileApp;
