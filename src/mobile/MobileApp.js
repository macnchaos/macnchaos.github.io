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

function MobileApp() {
  const [isAuth,setIsAuth] = useState(false);
  const isLoggedIn = ()=>{
    const user = auth.currentUser;
    if(user){
      if(isAuth===false){
        localStorage.setItem("isAuth",true);
        setIsAuth(true);
      }
      return true;
    }
    else{
      if(isAuth===true){
        localStorage.setItem("isAuth",false);
        setIsAuth(false);
      }
      return false;
    }
  };
  return (
    <Router>
      <HamburgerMenu isLoggedIn={isLoggedIn} setIsAuth={setIsAuth}/>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/createpost" element={<CreatePost isLoggedIn={isLoggedIn}/>} />
        <Route path = "/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path = "/posts/:id" element={<Posts isAuth={isAuth}/>} />
        <Route path = "/posts" element={<Blog isAuth={isAuth}/>} />
        <Route path = "/blog" element={<Blog isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}

export default MobileApp;
