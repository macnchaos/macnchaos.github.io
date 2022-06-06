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
      console.log(auth)
      navigate("/");
    })
  };
  return (
    <div className="loginPage">
      <p>
        SignIn with Google to continue
      </p>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>
        Sign In With Google
      </button>
    </div>
  )
}
export default Login;