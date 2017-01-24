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
import FilesView from './file/FilesView';

class Files extends React.Component {
  constructor(props) {
    super(props)
    this.renderFile = this.renderFile.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
  }
  handleClick(type, url, name, type1) {
      if (!this.props.modal) {
        if (type === 'img')  {
          return this.props.actions.showModal("FileImg", url);
        } else if (type === 'video'){
          return this.props.actions.showModal("FileVideo", {url, format: 'video'});
        } else if (type1 === 'pdf'){
          return this.props.actions.showModal("FilePdf", {url, format: 'pdf'});
        } else {
          return this.props.actions.music({url, status: 'play', name});
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
    } else if (data.action === 'Move') {
      var location = window.location.pathname.split('/');
      location = location[location.length - 1]
        if (location === ''){
          location = null;
        }
      this.props.actions.showModal('FileMove', {fileId: fileId, folderId: null, token: this.props.token, action: this.props.actions.move, location: location});
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
    return <FilesView file={file} key={i} handleClick={this.handleClick} token={this.props.token} view={this.props.view}/>
  }
  render() {
    return(
      <div>
      {this.props.files.length > 0 ? <h2>Files</h2> : null}
      {this.props.view ==="grid" ?
      <div className="row">
        {this.props.files.slice(0).reverse().map(this.renderFile)}
        <ContextMenusFile handleClick={this.handleClicks}/>
      </div>
      : <div>
      {this.props.files.length > 0 ?
      <div className="card">
      <table className="table table-bordered table-hover"><thead ><tr><th>Name</th><th>Last modified</th><th>File size</th></tr></thead>
      <tbody>
        {this.props.files.slice(0).reverse().map(this.renderFile)}
        <ContextMenusFile handleClick={this.handleClicks}/>
      </tbody>
      </table>
      </div>: null}</div>
      }
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
    return {modal: state.modal.status, token: state.auth.token, view: state.view};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, modalActions, fileActions), dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(Files);
