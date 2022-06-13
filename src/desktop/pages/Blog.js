import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db,auth } from '../../firebase-config.js';
import Tweet from "../posts/Tweet.js";
import Pimage from "../posts/Pimage.js"
import Pvideo from "../posts/Pvideo.js";
const Blog = ({isAuth}) => {
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
      const postCollectionRef = collection(db, "posts");
      const getPosts = async () => {
        //creating a new function because we need to do this asynchronously
        const data = await getDocs(postCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      console.log("inside Post render useEffect");
      
      getPosts();
    }, [updatePostList]);
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
                {isAuth && post.author.id === auth.currentUser.uid && (
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
      </div>
    );
};

export default Blog;
