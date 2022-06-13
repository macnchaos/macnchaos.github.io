import React, { useEffect, useState } from "react";
import { collection, query, limit, getDocs, orderBy, startAfter } from "firebase/firestore";
import { db} from '../../firebase-config.js';
import Tweet from "../posts/Tweet.js";
import Pimage from "../posts/Pimage.js"
import Pvideo from "../posts/Pvideo.js";
const PaginationBlog = () => {
    const [postList, setPostList] = useState([]);
    const [updatePostList,setUpdatePostList] = useState(true);
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
      const postCollectionRef = collection(db, "paginationTest");
      const getPosts = async () => {
        const dataQuery = query(postCollectionRef, limit(2), orderBy("timeStamp","desc"), startAfter(lastPost["timeStamp"]));
        
        const data = await getDocs(dataQuery)
        const appendList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setPostList(postList.concat(appendList));
      };
      console.log("inside Post render useEffect");
      
      getPosts();
    }, [updatePostList,postList]);
    //empty dependency => [] means call function only on first mount(may be on end also until app not in production)
    //https://blog.logrocket.com/solve-react-useeffect-hook-infinite-loop-patterns/
   
    
  
    return (
      <div className="homePage">
        {postList.map((post) => {
          return (
            <div className="post">
              <div className="postHeader">
                <div className="title">
                  <h1>{post.title}</h1>
                </div>
                <div className="postExternalLink" onClick={
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
            <div className="postFooter">
              <h3 className="author">@{post.author.name}</h3>
            </div>
          </div>
          )
        })}
        <button onClick={
            ()=>{
                setUpdatePostList(true)
            }
        }>
            +
        </button>
      </div>
    );
};

export default PaginationBlog;
