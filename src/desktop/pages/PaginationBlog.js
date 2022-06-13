import React, { useCallback, useEffect, useState } from "react";
import { collection, query, deleteDoc, doc, limit, getDocs, orderBy, startAfter } from "firebase/firestore";
import { db,auth } from '../../firebase-config.js';
import Tweet from "../posts/Tweet.js";
import Pimage from "../posts/Pimage.js"
import Pvideo from "../posts/Pvideo.js";
const PaginationBlog = ({isLoggedIn}) => {
    const [postList, setPostList] = useState([]);
    const [updatePostList,setUpdatePostList] = useState(true);
    function externalRedirect(id){
        window.location.pathname = '/posts/'+id;
    }
    const deletePost = useCallback(async (id) => {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      console.log("inside deletePost useCallback")
      setUpdatePostList(true);
    },[]);
  
    useEffect(() => {
      if (!updatePostList){
        return;
      }
      setUpdatePostList(false)
      var lastPost={
          timeStamp:0
      }
      if(postList.length > 0){
        lastPost = postList[postList.length-1]
      }
      const postCollectionRef = collection(db, "paginationTest");
      const getPosts = async () => {
        //creating a new function because we need to do this asynchronously
        console.log(lastPost)
        const dataQuery = query(postCollectionRef, limit(2), orderBy("timeStamp"), startAfter(lastPost["timeStamp"]));
        
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
