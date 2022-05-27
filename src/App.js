import React, {useState} from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import {signOut} from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {auth} from "./firebase-config";

function App() {
  const [isAuth,setIsAuth] = useState(false);

  let navigate = useNavigate()
  const signUserOut = () => {
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false)
      navigate("/login")
    })
  };
  return (
    <Router>
      <nav>
        <Link to="/">
          Home
        </Link>
        <Link to="/createpost">
          CreatePost
        </Link>
        {
          !isAuth ? <Link to="/login">
            Login
          </Link> : 
          <button onClick={signUserOut} > Log Out </button>
        }
      </nav>
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route path = "/createpost" element={<CreatePost/>} />
        <Route path = "/login" element={<Login setIsAuth={setIsAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
