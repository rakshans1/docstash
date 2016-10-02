import React, {PropTypes} from 'react';

const YoutubePlayer = ({video}) => {
    if (!video) {
        return <div className="col-md-8">Loading...</div>
    }
    const videoId = video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;
    return (
        <div className="video-detail col-md-8">

            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            </div>

            <div className="details card card-inverse">
                <div className="card-block">
                    <div style={{fontSize: '1.2em'}}>{video.snippet.title}</div>
                    <div style={{color: '#666', marginTop: 20}}>{video.snippet.description}</div>
                </div>
            </div>

        </div>
    );
}
YoutubePlayer.propTypes = {
    video: PropTypes.object
}
export default YoutubePlayer;
