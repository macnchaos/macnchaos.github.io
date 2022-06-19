import React, { useEffect, useState } from "react";
import { collection, query, limit, getDocs, orderBy, startAfter } from "firebase/firestore";
import { db} from '../../firebase-config.js';
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
    //empty dependency => [] means call function only on first mount(may be on end also until app not in production)
    //https://blog.logrocket.com/solve-react-useeffect-hook-infinite-loop-patterns/
   
    function convertToDate(timeStamp){
      var theDate = new Date(timeStamp.seconds*1000);
      return theDate.toString().slice(4,16) 
    }
  
    return (
      <div className="homePage">
        {postList.map((post) => {
          return (
            <div className="post">
              <div className="postHeader">
                <div className="title">
                  <h2>{post.title}</h2>
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
              <h4 className="author">@{post.author.name}</h4>
              <p>{convertToDate(post.timeStamp)}</p>
            </div>
          </div>
          )
        })}
        {
          showMoreButton?
          <button className="glow-on-hover" onClick={
              ()=>{
                  setUpdatePostList(true)
              }
          }>
              Load More
          </button>:
          <></>
        }
      </div>
    );
};

export default Blog;
