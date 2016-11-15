import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Files from '../components/main/sections/File';
import * as modalActions from '../actions/modalActions';
import {ContextMenuTrigger } from 'react-contextmenu';
import {ContextMenusFolder} from '../components/common/ContextMenu';

class SearchContainer extends React.Component {
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
                <h1 className="text-sm-center shortner_h1">Search Result</h1>
                <Files files={this.props.files}/>
              <ContextMenusFolder handleClick={this.handleClick}/>
            </div>
          </ContextMenuTrigger>
        );
    }
}
function mapStateToProps(state) {
    return {files: state.search.payload};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(modalActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(SearchContainer);
