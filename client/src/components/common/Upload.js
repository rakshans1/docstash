import React, {PropTypes} from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dropzone from 'react-dropzone';
import Icon from '../icon';
import units from '../../utils/units';
import * as uploadAction from '../../actions/UploadAction';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        };
        this.onDrop = this.onDrop.bind(this);
        this.span = this.span.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
        this.handelProgress = this.handelProgress.bind(this);
    }
    handelProgress(progressEvent, i, file) {
      var percentCompleted = progressEvent.loaded / progressEvent.total;
      file.percentCompleted = percentCompleted * 100;
      const files = this.state.files;
      files[i] = file;
      this.setState({files: files});
    }
    onDrop(acceptedfiles) {
        this.setState({files: acceptedfiles});
        acceptedfiles.forEach((file, i) => {
           var data = new FormData();
           data.append('file[]', file);
           let location = window.location.pathname.split('/');
           location = location[location.length - 1];
            var config = {
                onUploadProgress: (progressEvent) => {
                  this.handelProgress(progressEvent, i, file)
                },
                headers: {
                    authorization: this.props.token,
                    location: location
                }
            };
            this.props.actions.upload(data, config, this.props.token);
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
            {file.percentCompleted === 100 ? <div className="status-col"><Icon type="circle_tick_filled"/>00</div> : null}
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
Upload.propTypes = {
    actions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
    return {token: state.auth.token};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(uploadAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(Upload);
