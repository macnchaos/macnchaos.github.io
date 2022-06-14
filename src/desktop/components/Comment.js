function Comment({content}){
    return (
        <>
            <div className="image-wrapper" >
                <img className="postImageContainer" src={content.image} alt={content.alt} />
            </div>
            <div className="postTextContainer">{content.postText}</div>
        </>
    )
}
export default Comment;