import React, {useState} from "react";
import './DesktopApp.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import {signOut} from "firebase/auth";
import { auth } from "../firebase-config";


function DesktopApp() {
  const [isAuth,setIsAuth] = useState(false);

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
        <Link to="/posts">
          Posts
        </Link>
        {
          !isAuth ? <Link to="/login">
            Login
          </Link> : 
          <>
            <Link to="/createpost">
              Create
            </Link>
            <button onClick={signUserOut}> Log Out </button>
          </>
        }
      </nav>
      <Routes>
        <Route path = "/" element={<Home isAuth={isAuth}/>} />
        <Route path = "/posts" element={<Posts isAuth={isAuth}/>} />
        <Route path = "/createpost" element={<CreatePost isAuth={isAuth}/>} />
        <Route path = "/login" element={<Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
  );
}

export default DesktopApp;
