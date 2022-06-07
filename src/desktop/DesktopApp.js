import React, {useState} from "react";
import './DesktopApp.css';
import './NeonSign.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Blog from "./pages/Blog";
import {signOut} from "firebase/auth";
import { auth } from "../firebase-config";


function DesktopApp() {
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

  const signUserOut = ()=>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }
  return (
    <Router>
      <nav>
        <Link to="/">
          Home
        </Link>
        <Link to="/blog">
          Blog
        </Link>
        {
          isLoggedIn()? 
          <>
            <Link to="/createpost">
              Create
            </Link>
            
            <button align="right" className="desktop-button-logout" onClick={signUserOut}> LogOut </button>
          </>
          :
          <Link to="/login">
            Login
          </Link> 
        }
      </nav>
      <p class="link">Mayank Chaturvedi</p>
      <Routes>
        <Route path = "/" element={<Home isLoggedIn={isLoggedIn}/>} />
        <Route path = "/createpost" element={<CreatePost isLoggedIn={isLoggedIn}/>} />
        <Route path = "/login" element={<Login setIsAuth={setIsAuth}/>} />
        <Route path = "/posts/:id" element={<Posts isLoggedIn={isLoggedIn}/>} />
        <Route path = "/posts" element={<Blog isLoggedIn={isLoggedIn}/>} />
        <Route path = "/blog" element={<Blog isLoggedIn={isLoggedIn}/>} />
      </Routes>
    </Router>
  );
}

export default DesktopApp;
