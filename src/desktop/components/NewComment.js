import { addDoc, collection, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase-config";
const NewComment = ({commentId,isAuth,setData}) => {
    let navigate = useNavigate();
    const [commentText, setCommentText]=useState("")
    async function addComment(commentText){
        const parentCommentRef = doc(db, "comments",commentId);
        const docSnap = await getDoc(parentCommentRef)
        var parentPostId = "", parentPostChildren;
        if(docSnap.exists){
            parentPostId = docSnap.data()["post_id"];
            parentPostChildren=docSnap.data()["children"];
        }
        else{
            console.log("the parent post reference doesn't exist to add comment!!")
            navigate("/blog")
            return;
        }
        const commentsCollectionRef = collection(db,"comments");
        const payload = {
            parent:commentId,
            children:[],
            author:{
                name:auth.currentUser.displayName,
                id:auth.currentUser.uid
            },
            timeStamp:Timestamp.now(),
            text:commentText,
            post_id:parentPostId,
            depth:1
        };
        
        const newCommentRef = await addDoc(commentsCollectionRef, payload);
        parentPostChildren.unshift(newCommentRef.id)
        await updateDoc(parentCommentRef,{
            children:parentPostChildren
        })
        var modifiedData=docSnap.data();
        modifiedData["children"].unshift(newCommentRef.id)
        setData(modifiedData);
    }
    return (
        <div>
            {isAuth && (
               <div className='commentInput'> 
                    <label>{auth.currentUser.displayName+":"}</label> 
                    <textarea className='commentInputTextbox' value={commentText} placeholder = "Add a comment..." onChange={
                        (event)=>{
                            setCommentText(event.target.value)
                        }
                    }/>
                    {
                        commentText!==""&&(<button
                            onClick={() => {
                                addComment(commentText);
                                setCommentText("");
                            }}
                            className="commentButton"
                        />)
                    }
                </div>
            )}
            {!isAuth && (
               <div className='commentInput'> 
                    <button className="requestLogin" onClick={()=>{
                        navigate("/login")
                    }}>Login to add a comment</button>
                </div>
            )}
        </div>
    )
};

export default NewComment;
