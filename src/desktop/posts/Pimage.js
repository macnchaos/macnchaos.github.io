function Pimage({content}){
    return (
        <>
            <div className="image-wrapper" >
                <img className="postImageContainer" src={content.image} alt={content.alt} />
            </div>
            {content.postText!==""&&(
                    <>
                    <br></br>
                    <br></br>
                    </>
                )}
            <div className="postTextContainer">{content.postText}</div>
        </>
    )
}
export default Pimage;