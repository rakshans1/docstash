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
        } else {
          return this.props.actions.showModal("FileVideo", {url, format});
        }
      }
      this.props.actions.hideModal();
  }
  handleClicks(e, data, target) {
    const fileId = target.getAttribute('data-fileId');
    const token = this.props.token;
    if (data.action === 'Download'){
      return this.props.actions.download(fileId, token);
    } else if (data.action === 'File') {
        return this.props.actions.showModal("File");
    }else {
      return this.props.actions.remove(fileId, token);
    }
  }
  renderFile(file, i ) {
    const token = this.props.token;
    const time = moment(file.date_created).fromNow()
    const attributes = {'data-fileId': file._id};
    const type = file.type.split('/')[0]
    if ( type !== 'image' && type !== 'video' && type !== 'audio'){
    return(
      <ContextMenuTrigger id="file-context-menu" key={i} attributes={attributes}>
      <div className={'col-md-2 col-xs-6 doc-div'} >
           <div className="image-wrapper">
             <FileImg type={file.type}/>
           </div>
          <p className="filename">
              <FileIcon type={file.type.split('/')[0]}/>
              {file.name}</p>
          <p className="filetime">{time}</p>
      </div>
      </ContextMenuTrigger>
    );
  } else if (type === 'video' || type === 'audio') {
    return(
      <ContextMenuTrigger id="file-context-menu" key={i} attributes={attributes}>
      <div className="col-md-2 col-xs-6 doc-div pointer" >
          <div className="image-wrapper" onClick={() => this.handleClick('video', `${ROOT_URL}/video/${file.name}?token=${token}`, type)}>
              <FileImg type={file.type}/>
          </div>
          <p className="filename">
              <FileIcon type={file.type.split('/')[0]}/>
              {file.name}</p>
          <p className="filetime">{time}</p>
      </div>
      </ContextMenuTrigger>
    );
  }else {
    return(
      <ContextMenuTrigger id="file-context-menu" key={i} attributes={attributes}>
      <div className="col-md-2 col-xs-6 image-div pointer" >
          <div className="image-wrapper" onClick={() => this.handleClick('img', `${ROOT_URL}/image/full/${file.name}?token=${token}`)}>
              <img src={`${ROOT_URL}/image/${file.name}?token=${token}`} alt="' " className="image img-fluid img-rounded"/>
          </div>
          <p className="filename">
              <FileIcon type={file.type.split('/')[0]}/>
              {file.name}</p>
          <p className="filetime">{time}</p>
      </div>
      </ContextMenuTrigger>
    );
  }
  }
  render() {
    return(
      <div>
      {this.props.files.length > 0 ? <h2>Folders</h2> : null}
      <div className="row">
        {this.props.files.map(this.renderFile)}
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
