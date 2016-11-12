import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../actions/modalActions';
import Upload from './Upload';
import ImageView from '../main/sections/file/ImageView';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleOverlayClick = this.handleOverlayClick.bind(this);
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
    render() {
        if (!this.props.modal.status) {
            return null;
        }
        return (
            <div>
                <div className="modal_overlay" ref="overlay" onClick={this.handleOverlayClick}></div>
                <div className="modal" ref="content">
                    {this.props.modal.modal === "Upload" ? <Upload />: <ImageView url={this.props.modal.payload} />}
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
