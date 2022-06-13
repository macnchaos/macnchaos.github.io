import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query, startAfter} from "firebase/firestore";
import { db } from '../../firebase-config.js';
import Tweet from "../posts/Tweet.js";
import Pimage from "../posts/Pimage.js"
import Pvideo from "../posts/Pvideo.js";
const Blog = () => {
    
    const loadLimit = 5;
    const [postList, setPostList] = useState([]);
    const [updatePostList,setUpdatePostList] = useState(true);
    const [showMoreButton, setShowMoreButton] = useState(false);
  
    function externalRedirect(id){
        window.location.pathname = '/posts/'+id;
    }

    useEffect(() => {
      if (!updatePostList){
        return;
      }
      setUpdatePostList(false)
      var lastPost={
          timeStamp:{
            seconds:8640000000000000,
            nanoseconds:8640000000000000
          }
      }
      if(postList.length > 0){
        lastPost = postList[postList.length-1]
      }
      const postCollectionRef = collection(db, "posts");
      const getPosts = async () => {
        const dataQuery = query(postCollectionRef, limit(loadLimit), orderBy("timeStamp","desc"), startAfter(lastPost["timeStamp"]));
        
        const data = await getDocs(dataQuery)

        if(data.docs.length === loadLimit){
          setShowMoreButton(true);
        }
        else{
          setShowMoreButton(false);
        }

        const appendList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPostList(postList.concat(appendList));
      };
      console.log("inside Post render useEffect");
      
      getPosts();
    }, [updatePostList,postList]);
   
    
  
    return (
      <div className="mobileHomePage">
        {postList.map((post) => {
          return (
            <div className="mobilePost">  
              <div className="mobilePostHeader">
                <div className="title">
                  <h1>{post.title}</h1>
                </div>
                <div className="mobilePostExternalLink" onClick={
                  ()=>{
                    externalRedirect(post.id)
                  }
                }>
                  <button>
                    &#128279;
                  </button>
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
          )
        })}
        {
          showMoreButton?
          <button onClick={
              ()=>{
                  setUpdatePostList(true)
              }
          }>
              +
          </button>:
          <></>
        }
      </div>
    );
};

export default Blog;
