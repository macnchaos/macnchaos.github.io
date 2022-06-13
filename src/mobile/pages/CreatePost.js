import React, { useEffect, useState } from 'react';
import {addDoc, collection} from "firebase/firestore";
import { auth, db } from '../../firebase-config.js';
import { useNavigate } from 'react-router-dom';

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postLink, setPostLink] = useState("");
  const [postType, setPostType] = useState("");

  let navigate = useNavigate();

  const articleCollectionRef = collection(db,"posts");
  const createPost = async () => { //add rule in firebase table to allow only admins to write
    var content = {
      postText
    }
    if(postType==="macImage"){
      content["image"]=postLink;
    }
    else if(postType==="macVideo"){
      content["url"]=postLink;
    }
    
    await addDoc(articleCollectionRef, {
      title,
      postType,
      author: {
        name:auth.currentUser.displayName,
        id:auth.currentUser.uid
      },
      content
    });
    navigate("/");
  }

  useEffect( //can also authenticate post creator here
    ()=>{
      if(isAuth===false){
        navigate("/login");
      }
    }//,[isAuth] <--- Should this be here?
  );
  return (
    <div className = "mobile-createPostPage">
      <div className = "mobile-cpContainer">
        <h1>Create a post</h1>
        <div className='mobile-inputGp'>
          <label>Title : </label>  
          <input placeholder = "Title..." onChange={
            (event)=>{
              setTitle(event.target.value)
            }
          }/>
        </div>
        <div className='mobile-inputGp'>
          <label>Post Type : </label>  
          <input placeholder = "macTweet/macImage/macVideo..." onChange={
            (event)=>{
              setPostType(event.target.value)
            }
          }/>
        </div>
        <div className='mobile-inputGp'>
          <label>Post Text: </label>  
          <textarea placeholder = "Post..." onChange={
            (event)=>{
              setPostText(event.target.value)
            }
          }/>
        </div> 
        {
          (postType==="macVideo" || postType==="macImage")?
          <div className='mobile-inputGp'>
            <label>Content URL: </label>  
            <input placeholder = "https://..." onChange={
            (event)=>{
              setPostLink(event.target.value)
            }
          }/>
          </div>:
          <></>
        }
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost;