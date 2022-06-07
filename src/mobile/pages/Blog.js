import React, { useEffect, useState } from "react";
import { collection, getDocs} from "firebase/firestore";
import { db } from '../../firebase-config.js';
import Tweet from "../posts/Tweet.js";
import Pimage from "../posts/Pimage.js"
import Pvideo from "../posts/Pvideo.js";
const Blog = () => {
    const [postList, setPostList] = useState([]);
  
    function externalRedirect(id){
        window.location.pathname = '/posts/'+id;
    }

    useEffect(() => {
      const postCollectionRef = collection(db, "posts");
      const getPosts = async () => {
        //creating a new function because we need to do this asynchronously
        const data = await getDocs(postCollectionRef);
        setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      console.log("inside Post render useEffect");
      
      getPosts();
    }, []);
    //empty dependency => [] means call function only on first mount(may be on end also until app not in production)
    //https://blog.logrocket.com/solve-react-useeffect-hook-infinite-loop-patterns/
   
    
  
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
      </div>
    );
};

export default Blog;
