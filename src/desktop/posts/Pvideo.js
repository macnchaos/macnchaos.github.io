import ReactPlayer from "react-player";
function Pvideo({content}){
    return (
        <>
            <div className="player-wrapper">
                <ReactPlayer className="postVideoContainer" url={content.url} width="100%" height="100%" controls={true}/>
            </div>
            <div className="postTextContainer">{content.postText}</div>
        </>
    )
}
export default Pvideo;