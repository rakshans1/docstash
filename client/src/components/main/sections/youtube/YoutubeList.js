import React, {PropTypes} from 'react';

const YoutubeList = (props) => {
    const videoItems = props.videos.map((video, i) => {
        const imageUrl = video.snippet.thumbnails.default.url;
        return (
            <li key={i} className="list-group-item youtube-li" onClick={() => props.onVideoSelect(video)}>
                <div className="video-list media">
                    <div className="media-left">
                        <img src={imageUrl} className="media-object youtube-side-img" alt=""/>
                    </div>

                    <div className="media-body">
                        <div className="media-heading youtube-heading">{video.snippet.title}</div>
                    </div>
                </div>
            </li>
        );
    });
    return (
        <ul className="col-md-4 list-group">
            {videoItems}
        </ul>
    );
}
YoutubeList.propTypes = {
    videos: PropTypes.array
}
export default YoutubeList;
