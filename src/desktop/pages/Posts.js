import { deleteDoc, doc, getDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db,auth } from '../../firebase-config.js';
import Tweet from "../posts/Tweet.js";
import Pimage from "../posts/Pimage";
import Pvideo from "../posts/Pvideo";
// http://localhost:3000/posts/CvqdLhNbgLvJoksv9v7H
const Posts = ({isLoggedIn}) => {
  let navigate = useNavigate();
  const [post,setPost] = useState({
    author:{
      name:"loading content"
    }
  });
  const params = useParams();
  
  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    console.log("inside deletePost useCallback")
    navigate("/");
  },[navigate]);
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
    <div className="homePage">
      <div className="post">
        <div className="postHeader">
          <div className="title">
            <h1>{post.title}</h1>
          </div>
          <div className="deletePost">
            {isLoggedIn() && post.author.id === auth.currentUser.uid && (
              <button
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                {" "}
                &#128465;
              </button>
            )}
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
