import React from 'react'
import Dropzone from 'react-dropzone';
import Icon from '../icon';

class Upload extends React.Component{
  constructor(props) {
    super();
    this.state = {
      files: []
    };
    this.onDrop = this.onDrop.bind(this);
    this.span = this.span.bind(this);
  }
  onDrop(files) {
    this.setState({
      files: files
    });
    // console.log(files);
  }
  span() {
    if (this.state.files.length > 0) {
      return(
      <span>{this.state.files.length} files selected</span>
    );
    }
    return(
    <span>Choose a file&hellip;</span>
  );
  }
  render() {
    return(
      <div className="container">
      <div className="row box-main">
        <div className="col-sm-5 dropzone-wrapper">
              <Dropzone onDrop={this.onDrop}  className="dropzone" activeClassName="dropzone-active">
                <label><figure><Icon type="upload"/></figure>{this.span()}</label>
              </Dropzone>
        </div>
        <div className="col-sm-7 box-2">
            <ol className="upload-file-list">

              <li className="upload-file">
                <div className="upload-progress-bar"></div>

                <div className="upload-file-info">
                  <div className="filename-col">
                    <i className="flaticon-file flaticon-photo"></i>
                    <span className="upload-filename">ScreenShot from2016.png</span>
                    <span className="upload-size">- 2 kb</span>
                  </div>
                  <div className="status-col"><Icon type="circle_tick_filled"/>00</div>
                </div>

              </li>


            </ol>

        </div>
      </div>
      </div>
    );
  }
}
export default Upload;
