import React, { useEffect, useRef, useState } from 'react';
import {addDoc, collection, doc, setDoc, Timestamp} from "firebase/firestore";
import { auth, db } from '../../firebase-config.js';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";


const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postType, setPostType] = useState("Tweet");
  const [uploadProgress, setUploadProgress] = useState(-1);
  const hiddenFileInput = useRef(null);
  const postFile = useRef("");

  var postLink = "";
  let navigate = useNavigate();
  
  const articleCollectionRef = collection(db,"posts");
  const createPost = async () => { //add rule in firebase table to allow only admins to write
    
    const generateLink = async (attribute,convPostType,content)=>{
      const storage = getStorage();
      const fileName = (Math.random() + 1).toString(36).substring(2)
      var extension = postFile.current.type
      extension = extension.replace(/(.*)\//g, '')
      const storageRef = ref(storage, 'PublicMedia/'+fileName+"."+extension);
      
      
      const uploadTask = uploadBytesResumable(storageRef, postFile.current);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              console.log("inside default")
          }
        }, 
        (error) => {
          console.log("inside errro")
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            postLink=downloadURL
            content[attribute]=postLink;
            updatePostInDatabase(convPostType,content)
          });
        }
      );
    }

    var content = {
      postText
    }
    var convPostType = postType==="Tweet"?"macTweet":
                        postType==="Picture"?"macImage":
                        "macVideo";
    if(convPostType==="macImage"){
      if(postLink===""){
        await generateLink("image",convPostType,content);
      }
      else{
        content["image"]=postLink
        updatePostInDatabase(convPostType,content);
      }
    }
    else if(convPostType==="macVideo"){
      if(postLink===""){
        await generateLink("url",convPostType,content);
      }
      else{
        content["url"]=postLink
        updatePostInDatabase(convPostType,content);
      }
    }
    else if(convPostType==="macTweet"){
      updatePostInDatabase(convPostType,content);
    }
  }
  const updatePostInDatabase = async (convPostType,content)=>{
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
  function handleUploadButtonClick(event){
    hiddenFileInput.current.click();
  }
  function handleFileInputChange(event){
    postFile.current = event.target.files[0];
    if(postFile.current.size>0){
      setUploadProgress(0);
    }
  }
  return (
    <div className = "mobile-createPostPage">

      <div className = "mobile-cpContainer">
        <p className="mobile-BlogHeading">Artistic Hats</p>
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
        <div className='mobile-inputGp'>
          <label>Title : </label>  
          <input placeholder = "Title..." onChange={
            (event)=>{
              setTitle(event.target.value)
            }
          }/>
        </div>
        <div className='mobile-inputGp'>
          <label>Post Text: </label>  
          <textarea placeholder = "Post..." onChange={
            (event)=>{
              setPostText(event.target.value)
            }
          }/>
        </div> 
        {
          (postType==="Video" || postType==="Picture")&&
          (<div className='mobile-inputGp'>
            <label>Content URL: </label>  
            <input placeholder = "optional: https://..." onChange={
            (event)=>{
              postLink = event.target.value
            }
          }/>
          </div>)
        }
        {
          (postType==="Video" || postType==="Picture")&&uploadProgress===-1&&(
            <>
              <button onClick={handleUploadButtonClick} className="mobile-UploadMediaButton">
                Upload A File
              </button>
              <input type="file"
                    ref={hiddenFileInput}
                    onChange={handleFileInputChange}
                    style={{display:'none'}} 
              /> 
            </>
          )
        }
        {
          uploadProgress>0 && (
            <div className='mobile-inputGp'>
              <label>{Math.floor(uploadProgress)}%</label>
            </div>
          )
        }
        {
          uploadProgress===0 && (
            <div className='mobile-inputGp'>
              <label>Ready to upload</label>
            </div>
          )
        }
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
}

export default CreatePost;