import React, {PropTypes} from 'react';
import Input from '../../../Input';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fileActions from '../../../../actions/fileActions';

class FolderandFileModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          file: ''
        }
        this.validateFile = this.validateFile.bind(this);
        this.handleFileInput = this.handleFileInput.bind(this);
        this.saveAndContinue = this.saveAndContinue.bind(this);
    }
    handleFileInput(event) {
        this.setState({file: event.target.value});
    }
    saveAndContinue(e) {
        let canProceed = this.validateFile(this.state.file);
        if (this.props.payload.type === "folder" && canProceed ) {
            let location = window.location.pathname.split('/');
            location = location[location.length - 1]
            if (location === ''){
              location = null;
            }
            this.props.actions.folderNew(this.state.file, this.props.token, location);
        } else {
            this.refs.file.isValid();
        }
    }

    validateFile(file) {
        if (file.length == 0 )
          return false
        return true;
    }

    render() {
        return (
          <div className="main-bg container">
              <h2>{this.props.payload.type === "folder" ? 'Folder Name' : 'Rename'}</h2>
              <p>Please enter new name for the item:</p>
              <Input text="Enter Name For Item" ref="file" type="text" validate={this.validateFile} value={this.state.file} emptyMessage="Cant Be Empty" onChange={this.handleFileInput}/>
              <button className="button button_center" onClick={this.saveAndContinue}>OK</button>
          </div>
        );
    }
}
FolderandFileModal.propTypes = {
    modal: PropTypes.object,
    actions: PropTypes.object.isRequired
}
function mapStateToProps(state) {
    return {token: state.auth.token};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(fileActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(FolderandFileModal);
