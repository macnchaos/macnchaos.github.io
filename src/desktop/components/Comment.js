import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import NewComment from "./NewComment"
import CommentCard from "./CommentCard"
function Comment({commentId, setSeed, isAuth}){
    const [depth,setDepth]=useState(3);
    const [data,setData]=useState({});
    useEffect(() => {
        const populateData = async ()=>{
            const parentCommentRef = doc(db, "comments",commentId);
            const docSnap = await getDoc(parentCommentRef);
            if(docSnap.exists){
                setDepth(docSnap.data()["depth"])
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
            <h3>Comments</h3>
            {
                depth===0?
                    <>
                        <NewComment commentId={commentId} isAuth={isAuth} setData={setData}/>
                        {
                            data["children"].map((comment)=>{
                                return (
                                    <CommentCard commentId={comment} isAuth={isAuth} setSeed={setSeed} depth={depth}/>
                                )
                            })
                        }
                    </>:
                    depth===1?
                    <>
                        <button onClick={()=>{
                            setSeed(data["post_id"])
                        }}>&#8592;</button>
                        <CommentCard commentId={commentId} isAuth={isAuth} setSeed={setSeed} depth={depth}/>
                        <div className="rightShiftedCommentDiv">
                            <NewComment commentId={commentId} isAuth={isAuth} setData={setData}/>
                            {
                                data["children"].map((comment)=>{
                                    return (
                                        <CommentCard commentId={comment} isAuth={isAuth} setSeed={setSeed} depth={depth}/>
                                    )
                                })
                            }
                        </div>
                    </>:
                    <>
                        
                    </>
            }
        </>
    )
}
export default Comment;