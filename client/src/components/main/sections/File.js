import React, {PropTypes} from 'react';
import moment from 'moment';
import FileImg from './file/FileImg';
import ROOT_URL from '../../../baseurl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../../actions/modalActions';
import {ContextMenuTrigger } from 'react-contextmenu';
import {ContextMenusFile} from '../../common/ContextMenu';
import * as fileActions from '../../../actions/fileActions';
import FileIcon from './file/FileIcon';

class Files extends React.Component {
  constructor(props) {
    super(props)
    this.renderFile = this.renderFile.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
  }
  handleClick(type, url, format) {
      if (!this.props.modal) {
        if (type === 'img')  {
          return this.props.actions.showModal("FileImg", url);
        } else if (type === 'video'){
          return this.props.actions.showModal("FileVideo", {url, format});
        } else {
          return this.props.actions.music(url);
        }
      }
      this.props.actions.hideModal();
  }
  handleClicks(e, data, target) {
    const fileId = target.getAttribute('data-fileId');
    const token = this.props.token;
    if (data.action === 'Download'){
      return this.props.actions.download(fileId, token);
    } else if (data.action === 'Rename') {
        const fileName = target.getAttribute('data-fileName');
        return this.props.actions.showModal("File" , {type: "rename",renameType:  'file', fileId: fileId, fileName: fileName});
    } else {
      var location = window.location.pathname.split('/');
      location = location[location.length - 1]
        if (location === ''){
          location = null;
        }
      return this.props.actions.remove(fileId, token, 'file', location);
    }
  }
  renderFile(file, i ) {
    const token = this.props.token;
    const time = moment(file.createdAt).fromNow()
    const attributes = {'data-fileId': file._id, 'data-fileName': file.name};
    const type = file.type.split('/')[0]
    if ( type !== 'image' && type !== 'video' && type !== 'audio'){
    return(
      <ContextMenuTrigger id="file-context-menu" key={i} attributes={attributes}>
      <div className={'col-md-2 col-xs-6 doc-div'} >
           <div className="image-wrapper">
             <FileImg type={file.type}/>
           </div>
           <div className="tooltip">
           <p className="filename">
             <FileIcon type={file.type.split('/')[0]}/>
                {file.name}</p>
             <span className="tooltiptext">{file.name}</span>
           </div>
          <p className="filetime">{file.size} {time}</p>
      </div>
      </ContextMenuTrigger>
    );
  } else if (type === 'video' || type === 'audio') {
    return(
      <ContextMenuTrigger id="file-context-menu" key={i} attributes={attributes}>
      <div className="col-md-2 col-xs-6 doc-div pointer" >
          <div className="image-wrapper" onClick={() => this.handleClick(type, `${ROOT_URL}/video/${file._id}?token=${token}`, type)}>
              <FileImg type={file.type}/>
          </div>
          <div className="tooltip">
          <p className="filename">
            <FileIcon type={file.type.split('/')[0]}/>
               {file.name}</p>
            <span className="tooltiptext">{file.name}</span>
          </div>
          <p className="filetime">{file.size} {time}</p>
      </div>
      </ContextMenuTrigger>
    );
  }else {
    return(
      <ContextMenuTrigger id="file-context-menu" key={i} attributes={attributes}>
      <div className="col-md-2 col-xs-6 image-div pointer" >
          <div className="image-wrapper" onClick={() => this.handleClick('img', `${ROOT_URL}/image/full/${file._id}?token=${token}`)}>
              <img src={`${ROOT_URL}/image/${file._id}?token=${token}`} alt="' " className="image img-fluid img-rounded"/>
          </div>
          <div className="tooltip">
          <p className="filename">
            <FileIcon type={file.type.split('/')[0]}/>
               {file.name}</p>
            <span className="tooltiptext">{file.name}</span>
          </div>
          <p className="filetime">{file.size} {time}</p>
      </div>
      </ContextMenuTrigger>
    );
  }
  }
  render() {
    return(
      <div>
      {this.props.files.length > 0 ? <h2>Files</h2> : null}
      <div className="row">
        {this.props.files.slice(0).reverse().map(this.renderFile)}
        <ContextMenusFile handleClick={this.handleClicks}/>
    </div>
    </div>
    );
  }
}
Files.propTypes = {
    modal: PropTypes.bool,
    actions: PropTypes.object.isRequired,
    files: PropTypes.array,
    token: PropTypes.string
};
function mapStateToProps(state) {
    return {modal: state.modal.status, token: state.auth.token};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, modalActions, fileActions), dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(Files);
