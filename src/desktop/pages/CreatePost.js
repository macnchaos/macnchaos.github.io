import React, { useEffect, useState } from 'react';
import {addDoc, collection, doc, setDoc, Timestamp} from "firebase/firestore";
import { auth, db } from '../../firebase-config.js';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postFile, setPostFile] = useState("");
  const [postType, setPostType] = useState("Tweet");

  var postLink = "";
  let navigate = useNavigate();
  
  const articleCollectionRef = collection(db,"posts");
  const createPost = async () => { //add rule in firebase table to allow only admins to write
    const generateLink = async ()=>{
      const storage = getStorage();
      const fileName = (Math.random() + 1).toString(36).substring(2)
      var extension = postFile.type
      extension = extension.replace(/(.*)\//g, '')
      const storageRef = ref(storage, 'PublicMedia/'+fileName+"."+extension);
      await uploadBytes(storageRef, postFile);
      await getDownloadURL(storageRef).then((url)=>{
        postLink = url;
      })
    }

    var content = {
      postText
    }
    var convPostType = postType==="Tweet"?"macTweet":
                        postType==="Picture"?"macImage":
                        "macVideo";
    if(convPostType==="macImage"){
      await generateLink();
      content["image"]=postLink;
    }
    else if(convPostType==="macVideo"){
      await generateLink();
      content["url"]=postLink;
    }
    console.log(content)
    const ctime = Timestamp.now()
    const docRef = await addDoc(articleCollectionRef, {
      title,
      postType: convPostType,
      author: {
        name:auth.currentUser.displayName,
        id:auth.currentUser.uid
      },
      content,
      timeStamp:ctime
    });
    await setDoc(
      doc(db,"comments",docRef.id),
      {
        "parent":docRef.id,
        "children":[],
        "author":{
          name:auth.currentUser.displayName,
          id:auth.currentUser.uid
        },
        "timeStamp":ctime,
        "text":"",
        "post_id":docRef.id,
        "depth":0
      }
    );
    navigate("/blog");
  }

  useEffect( //can also authenticate post creator here
    ()=>{
      if(!isAuth){
        navigate("/login");
      }
    }
  );
  function handleUpload(event){
    setPostFile(event.target.files[0]);
  }
  return (
    <div className = "createPostPage">
      <div className = "cpContainer">
        
        <div className="postOptionSelect">
          <h1>Post a </h1>
          <select
            value={postType}
            onChange={
              (e)=>{
                setPostType(e.target.value)
              }
            } 
          >
            <option>Tweet</option>
            <option>Picture</option>
            <option>Video</option>
          </select>
        </div>
        
        <div className='inputGp'>
          <label>Title : </label>  
          <input placeholder = "Title..." onChange={
            (event)=>{
              setTitle(event.target.value)
            }
          }/>
        </div>
        <div className='inputGp'>
          <label>Post Text: </label>  
          <textarea placeholder = "Post..." onChange={
            (event)=>{
              setPostText(event.target.value)
            }
          }/>
        </div> 
        {
          (postType==="Video" || postType==="Picture")&&(
          <div id="upload-box" onChange={handleUpload}>
            <input type="file"/>
          </div>)
        }
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost;