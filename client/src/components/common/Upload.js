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
    }
    onDrop(files) {
        this.setState({files: files});
        // var data = new FormData();
        // files.forEach((file) => {
        //   data.append('uploads[]', file);
        // });
        //axios.post('http://localhost:3001/upload', data)
        //.then(res => console.log(res))
        //.catch(err => console.log(err));
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
        <li className="upload-file">
            <div className="upload-progress-bar"></div>
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
