import React, { useCallback, useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db,auth } from '../../firebase-config.js';
const Posts = ({isAuth}) => {
    const [postList, setPostList] = useState([]);
    const [updatePostList,setUpdatePostList] = useState(true);
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
              <div className="postTextContainer">{post.postText}</div>
              <h3>@{post.author.name}</h3>
            </div>
          );
        })}
      </div>
    );
};

export default Posts;
