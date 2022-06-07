import React from 'react'
import { auth,provider } from '../../firebase-config.js';
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom';
const Login = ({setIsAuth}) => {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth,provider).then((result)=>{
      localStorage.setItem("isAuth",true);
      setIsAuth(true);
      navigate("/");
    })
  };
  return (
    <div className="loginPage">
      <p className='sign__word'>Sign in to the world of chaos</p>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>
        SignIn with Google
      </button>
    </div>
  )
}
export default Login;