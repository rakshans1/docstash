import React from 'react'
import Dropzone from 'react-dropzone';
import Icon from '../icon';
import axios from 'axios';
import units from '../../utils/units';

class Upload extends React.Component {
    constructor(props) {
        super();
        this.state = {
            files: []
        };
        this.onDrop = this.onDrop.bind(this);
        this.span = this.span.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        // this.handelProgress = this.handelProgress.bind(this);
    }

    onDrop(acceptedfiles) {
      const state = this.state;
      function handelProgress(progressEvent, i, file) {
        var percentCompleted = progressEvent.loaded / progressEvent.total;
        // file.percentCompleted = percentCompleted;
        const files = state.files;
        files[i] = file;
        // this.setState({files: files});
        console.log(file);
        // console.log(file.percentCompleted);
      }
        const setState = this.setState;
        this.setState({files: acceptedfiles});
         this.state.files.forEach((file, i) => {
           var data = new FormData();
           data.append('file[]', file);
            var config = {
                onUploadProgress: (progressEvent, i, file) => handelProgress(progressEvent, i, file)
            };
            axios.post('http://6deb4c7c.ngrok.io/upload', data, config)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        });
    }
    span() {
        if (this.state.files.length > 0) {
            return (
                <span>{this.state.files.length} files selected</span>
            );
        }
        return (
            <span>Choose a file&hellip;</span>
        );
    }
    uploadFile(file, i) {
      return(
        <li className="upload-file" key={i}>
          <div className="upload-progress-bar" style={{width: file.percentCompleted + '%'}}></div>
          <div className="upload-file-info">
            <div className="filename-col">
              <i className="flaticon-file flaticon-photo"></i>
              <span className="upload-filename">{file.name}</span>
              <span className="upload-size">- {units(file.size)}</span>
            </div>
            <div className="status-col"><Icon type="circle_tick_filled"/>00</div>
          </div>
        </li>
      );
    }

    render() {
        return (
            <div className="container">
              <div className="row box-main">
                <div className="col-sm-5 dropzone-wrapper">
                  <Dropzone onDrop={this.onDrop} className="dropzone" activeClassName="dropzone-active">
                    <label>
                      <figure><Icon type="upload"/></figure>{this.span()}</label>
                  </Dropzone>
                </div>
                <div className="col-sm-7 box-2">
                  <ol className="upload-file-list">
                    {this.state.files ? this.state.files.map(this.uploadFile) : null}
                  </ol>

                </div>
              </div>
            </div>
        );
    }
}
export default Upload;
