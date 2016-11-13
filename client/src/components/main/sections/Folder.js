import React, {PropTypes} from 'react';
import FileImg from './file/FileImg';
import ROOT_URL from '../../../baseurl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../../actions/modalActions';
import {ContextMenuTrigger } from 'react-contextmenu';
import {ContextMenusFolders} from '../../common/ContextMenu';
import * as fileActions from '../../../actions/fileActions';
import {IndexLink, Link} from 'react-router';

class Folders extends React.Component {
  constructor(props) {
    super(props)
    this.renderFolder = this.renderFolder.bind(this)
    this.handleClick = this.handleClick.bind(this);
    this.handleClicks = this.handleClicks.bind(this);
  }
  handleClick(url) {
      if (!this.props.modal) {
          return this.props.actions.showModal("FileImg", url);
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
  renderFolder(folder, i ) {
    const token = this.props.token;
    const attributes = {'data-folderId': folder._id};
    return(
      <div className="col-md-2 col-xs-6 folder-div" key={i}>
      <ContextMenuTrigger id="folders-context-menu"  attributes={attributes}>
            <Link to={`/folder/${folder._id}`}>
                <div className="folder">
                    <p className="foldername">
                        <i className="flaticon flaticon-folder"></i>{folder.name}</p>
                </div>
            </Link>
      </ContextMenuTrigger>
    </div>
    );
  }
  render() {
    return(
      <div>
        {this.props.folders.length > 0 ? <h2>Folders</h2> : null}
        <div className="row">
          {this.props.folders.map(this.renderFolder)}
          <ContextMenusFolders handleClick={this.handleClicks}/>
      </div>
    </div>
    );
  }
}
Folders.propTypes = {
    modal: PropTypes.bool,
    actions: PropTypes.object.isRequired,
    folders: PropTypes.array,
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
export default connect(mapStateToProps, mapDispatchToProp)(Folders);
