import React from 'react';
import Input from '../components/Input';
import axios from 'axios';
import {addNotification} from '../actions/notificationActions';
import {beginAjaxCall, ajaxCallError} from '../actions/ajaxstatusActions';
import YoutubeList from '../components/main/sections/youtube/YoutubeList';
import YoutubePlayer from '../components/main/sections/youtube/YoutubePlayer';
import _ from '../utils/lobash';

class Youtube extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            term: 'casey neistat',
            videos: [],
            selectedVideo: null,
            time: 0
        };
        this.handleUrlInput = this.handleUrlInput.bind(this);
        this.yts = this.yts.bind(this);

        this.videoSearch(this.state.term);
    }
    handleUrlInput(event) {
        this.setState({term: event.target.value});
        var d = new Date();
        if (d.getTime() - this.state.time > 500){
          this.videoSearch(this.state.term);
        }
        this.setState({time: d.getTime()});
    }
    videoSearch(term) {
        this.yts(term, (videos) => this.setState({videos:videos , selectedVideo: videos[0] }));
    }
    yts(data, done) {
        const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';
        const API_KEY = " AIzaSyDXg81_AWps2GjIDXC_farb1soecuj6jMA"
        var params = {
            part: 'snippet',
            key: API_KEY,
            q: data,
            type: 'video'
        };
        beginAjaxCall();
        axios.get(ROOT_URL, {params: params}).then(function(response) {
            ajaxCallError();
            done(response.data.items)
        }).catch(function(error) {
            ajaxCallError();
            addNotification(error, 'error')
        });
    }
    render() {
        return (
            <div className="col-sm-8 col-xs-12 shortner">
                <h1 className="text-sm-center shortner_h1">Youtube Player</h1>
                <div className="row">
                    <div className="col-sm-12">
                        <Input text="Enter Search Term" ref="youtube" type="text" value={this.state.term} onChange={this.handleUrlInput} errorMessage="Url is invalid" emptyMessage="Search term is empty" errorVisible={this.state.showUrlError}/>
                    </div>
                    <YoutubePlayer video={this.state.selectedVideo}/>
                    <YoutubeList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>

                </div>
            </div>
        );
    }
}

export default Youtube;
