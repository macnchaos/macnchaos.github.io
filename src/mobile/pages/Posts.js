import { deleteDoc, doc, getDoc, Timestamp } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db,auth } from '../../firebase-config.js';
import Tweet from "../posts/Tweet.js";
import Pimage from "../posts/Pimage";
import Pvideo from "../posts/Pvideo";
import Comment from "../components/Comment.js";
// http://localhost:3000/posts/CvqdLhNbgLvJoksv9v7H
const Posts = ({isAuth}) => {
  let navigate = useNavigate();
  const [post,setPost] = useState({
    author:{
      name:"loading content"
    },
    timeStamp:Timestamp.now()
  });
  const params = useParams();

  const [commentId,setCommentId]=useState(params.id);
  
  function convertToDate(timeStamp){
    var theDate = new Date(timeStamp.seconds*1000);
    return theDate.toString().slice(4,16) 
  }
  const deletePost = useCallback(async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    const commentDoc = doc(db, "comments", id);
    await deleteDoc(commentDoc);
    console.log("inside deletePost useCallback")
    navigate("/blog");
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
          },
          timeStamp:Timestamp.now()
        })
        console.log("No such document!");
      }
    }
    if(Object.keys(post).length===2){
      getPost();
    }
  },[params,commentId,post]);
  return (
    <div className="mobileHomePage">
      <p className="mobile-BlogHeading">Forum</p>
      <div className="mobilePost">
        <div className="mobilePostHeader">
          <div className="title">
            <h2>{post.title}</h2>
          </div>
          <div className="deletePost">
            {isAuth && post.author.id === auth.currentUser.uid && (
              <button
                onClick={() => {
                  deletePost(params.id);
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
        <div className="mobilePostFooter">
          <h4 className="author">@{post.author.name}</h4>
          <p className="date">{convertToDate(post.timeStamp)}</p>
        </div>
      </div>
      <div className="mobile-commentContainer">
        <Comment commentId={commentId} setSeed={setCommentId} isAuth={isAuth}/>
      </div>
    </div>
  )
};

export default Posts;
