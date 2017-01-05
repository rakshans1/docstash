import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../actions/modalActions';
import Upload from './Upload';
import ImageView from '../main/sections/file/ImageView';
import FolderandFileModal from '../main/sections/file/FolderandFileModal';
import VideoView from '../main/sections/file/VideoView';
import FileMove from '../main/sections/file/FileMove';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
        this.renderModal = this.renderModal.bind(this);
    }
    componentWillUpdate() {
        const modalTarget = document.getElementsByClassName('modal');
        modalTarget.className = 'modal-show';
    }
    handleOverlayClick(e) {
        const node = e.target;
        if (node === this.refs.content)
            return
        if (!this.props.modal.status) {
            return this.props.actions.showModal();
        }
        this.props.actions.hideModal();
    }
    renderModal(){
      const modal = this.props.modal.modal;
      if (modal === "Upload" ) {
        return <Upload />
      } else if (modal === "File") {
        return <FolderandFileModal payload={this.props.modal.payload}/>
      } else if (modal === 'FileImg'){
        return <ImageView url={this.props.modal.payload} />
      } else if (modal === 'FileVideo'){
        return <VideoView payload={this.props.modal.payload}/>
      } else if (modal === 'FileMove'){
        return <FileMove folderId={this.props.modal.payload.folderId} token={this.props.modal.payload.token} location={this.props.modal.payload.location} fileId={this.props.modal.payload.fileId} move={this.props.modal.payload.action}/>
      }
    }
    render() {
        if (!this.props.modal.status) {
            return null;
        }
        return (
            <div>
                <div className="modal_overlay" ref="overlay" onClick={this.handleOverlayClick}></div>
                <div className="modal" ref="content">
                    {this.renderModal()}
                </div>
            </div>
        );
    }
}
Modal.propTypes = {
    children: PropTypes.object,
    modal: PropTypes.object,
    actions: PropTypes.object.isRequired
}
function mapStateToProps(state) {
    return {modal: state.modal};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(modalActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(Modal);
