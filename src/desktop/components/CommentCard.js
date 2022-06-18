import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
const CommentCard = ({commentId,isAuth,setSeed,depth,setRefresh}) => {
    const [data,setData]=useState({});
    function convertToDate(timeStamp){
        var theDate = new Date(timeStamp.seconds*1000);
        return theDate.toString().slice(4,16) 
    }
    useEffect(() => {
        const populateData = async ()=>{
            const parentCommentRef = doc(db, "comments",commentId);
            const docSnap = await getDoc(parentCommentRef);
            if(docSnap.exists){
                setData(docSnap.data())
            }
            else{
                console.log("the parent post reference doesn't exist to add comment!!")
            }
        };
        populateData();
    }, [commentId]);
    return (
    <>
        {
            Object.keys(data).length>0 && (
                <div className="commentCard">
                    <div className="commentCardHeader">
                        <div className="nameNTime">
                            <p>{data.author.name} </p>
                            <p> &#10002; </p>
                            <p> {convertToDate(data.timeStamp)}</p>
                        </div>
                        {depth===0 && <div className="commentReply">
                            <button onClick={()=>{
                                setSeed(commentId);
                            }}>
                                &#10548;
                            </button>
                        </div>}
                    </div>
                    <div className="commentCardtextArea">
                        {
                            data.text
                        }
                    </div>
                    {depth===0 && data["children"].length>0 && (<div className="commentCardtextAreafooter">
                        {
                            <button onClick={()=>{
                                setSeed(commentId);
                            }}>{data["children"].length} REPLIES</button>
                        }
                    </div>)}
                </div>
            )
        }
    </>
    )
};

export default CommentCard;
