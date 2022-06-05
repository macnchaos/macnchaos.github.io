import ReactPlayer from "react-player";
function Pvideo({content}){
    return (
        <div >
            <div className="mobile-player-wrapper">
                <ReactPlayer className="mobilePostVideoContainer" url={content.url} width="100%" height="100%" controls={true}/>
                
            </div>
            <div className="mobilePostTextContainer">{content.postText}</div>
        </div>
    )
}
export default Pvideo;