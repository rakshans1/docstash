import React, {PropTypes} from 'react';
import Files from './sections/File';
import Folders from './sections/Folder';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../actions/modalActions';
import {ContextMenuTrigger } from 'react-contextmenu';
import {ContextMenusFolder} from '../common/ContextMenu';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
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
                <Folders folders={this.props.folders}/>
                <Files files={this.props.files}/>
              <ContextMenusFolder handleClick={this.handleClick}/>
            </div>
          </ContextMenuTrigger>
        );
    }
}
Main.propTypes = {
    modal: PropTypes.bool,
    token: PropTypes.string
};
function mapStateToProps(state) {
    return { modal: state.modal.status, files: state.file, folders: state.folder};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(modalActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(Main);
