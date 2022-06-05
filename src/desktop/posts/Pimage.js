function Pimage({content}){
    return (
        <>
            <img className="postImageContainer" src={content.image} alt={content.alt}/>
            <div className="postTextContainer">{content.postText}</div>
        </>
    )
}
export default Pimage;