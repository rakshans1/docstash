import React, {PropTypes} from 'react';
import Files from './sections/File';
import Folders from './sections/Folder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../actions/modalActions';
import * as fileActions from '../../actions/fileActions';
import {ContextMenuTrigger } from 'react-contextmenu';
import {ContextMenusFolder} from '../common/ContextMenu';

class FolderMain extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      const folderId = this.props.location.pathname.split('/')[2];
      this.props.actions.files(this.props.token, 'SUBFILE', folderId);
      this.props.actions.folders(this.props.token, 'SUBFOLDER', folderId);
    }
    componentWillUpdate(nextProps) {
      if (nextProps.location.pathname !== this.props.location.pathname) {
        const folderId = nextProps.location.pathname.split('/')[2];
        this.props.actions.files(this.props.token, 'SUBFILE', folderId);
        this.props.actions.folders(this.props.token, 'SUBFOLDER', folderId);
      }
    }
    handleClick() {
        if (!this.props.modal) {
            return this.props.actions.showModal("File", {type: "folder"});
        }
        this.props.actions.hideModal();
    }
    render() {
        return (
          <ContextMenuTrigger id="folder-context-menu" >
            <div className="container-fluid library">
                <Folders folders={this.props.subfolders}/>
                <Files files={this.props.subfiles}/>
              <ContextMenusFolder handleClick={this.handleClick}/>
            </div>
          </ContextMenuTrigger>
        );
    }
}
FolderMain.propTypes = {
    modal: PropTypes.bool,
    token: PropTypes.string,
    subfiles: PropTypes.array,
    subfolders: PropTypes.array
};
function mapStateToProps(state) {
    return { modal: state.modal.status,token: state.auth.token, subfiles: state.subfile, subfolders: state.subfolder};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, modalActions, fileActions), dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(FolderMain);
