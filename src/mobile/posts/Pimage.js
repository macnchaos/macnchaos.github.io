function Pimage({content}){
    return (
        <>
            <div className="mobile-image-wrapper" >
                <img className="mobilePostImageContainer" src={content.image} alt={content.alt} />
            </div>
            <div className="mobilePostTextContainer">{content.postText}</div>
        </>
        
    )
}
export default Pimage;