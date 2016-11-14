import React, {PropTypes} from 'react';
import Files from './sections/File';
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
      const filter = this.props.location.pathname.split('/')[1];
      this.props.actions.filefilter(this.props.token, filter);
    }
    componentWillUpdate(nextProps) {
      if (nextProps.location.pathname !== this.props.location.pathname) {
        const filter = nextProps.location.pathname.split('/')[1];
        this.props.actions.filefilter(this.props.token, filter);
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
                <Files files={this.props.filterfiles}/>
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
    return { modal: state.modal.status,token: state.auth.token, filterfiles: state.filefilter};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, modalActions, fileActions), dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(FolderMain);
