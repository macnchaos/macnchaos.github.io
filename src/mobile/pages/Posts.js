import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from '../../firebase-config.js';
import Tweet from "../posts/Tweet.js";
import Pimage from "../posts/Pimage";
import Pvideo from "../posts/Pvideo";
// http://localhost:3000/posts/CvqdLhNbgLvJoksv9v7H
const Posts = () => {
  const [post,setPost] = useState({
    author:{
      name:"loading content"
    }
  });
  const params = useParams();
  useEffect(()=>{
    const getPost = async ()=>{
      const docRef = doc(db, "posts",params.id);
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        setPost({
          author:{
            name:"Please recheck the URL. You seem to have landed in the unknown territories of the internet"
          }
        })
        console.log("No such document!");
      }
    }
    getPost();
  },[params]);
  return (
    <div className="mobileHomePage">
      <div className="mobilePost">
        <div className="mobilePostHeader">
          <div className="title">
            <h1>{post.title}</h1>
          </div>
        </div>
      {
        post.postType === "macTweet" ?
          <Tweet content = {post.content}/>:
        post.postType === "macImage" ?
          <Pimage content = {post.content}/>:
        post.postType === "macVideo" ?
          <Pvideo content = {post.content}/>:
        <></>
      }
      <h3>@{post.author.name}</h3>
    </div>
    </div>
  )
};

export default Posts;
