import React, { useEffect, useState } from 'react';
import {addDoc, collection} from "firebase/firestore";
import { auth, db } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  let navigate = useNavigate();

  const articleCollectionRef = collection(db,"articles");
  const createPost = async () => { //add rule in firebase table to allow only admins to write
    await addDoc(articleCollectionRef, {
      title,
      postText,
      author: {
        name:auth.currentUser.displayName,
        id:auth.currentUser.uid
      }
    });
    navigate("/");
  }

  useEffect( //can also authenticate post creator here
    ()=>{
      if(!isAuth){
        navigate("/login");
      }
    }//,[isAuth] <--- Should this be here?
  );
  return (
    <div className = "createPostPage">
      <div className = "cpContainer">
        <h1>Create a post</h1>
        <div className='inputGp'>
          <label>Title : </label>  
          <input placeholder = "Title..." onChange={
            (event)=>{
              setTitle(event.target.value)
            }
          }/>
        </div>
        <div className='inputGp'>
          <label>Post : </label>  
          <textarea placeholder = "Post..." onChange={
            (event)=>{
              setPostText(event.target.value)
            }
          }/>
        </div> 
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost;