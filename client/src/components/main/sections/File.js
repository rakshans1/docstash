import React, {PropTypes} from 'react';
import moment from 'moment';
import FileImg from './file/FileImg';
import ROOT_URL from '../../../baseurl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../../actions/modalActions';
import {ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import ContextMenus from '../../common/ContextMenu';
import * as fileActions from '../../../actions/fileActions';

class Files extends React.Component {
  constructor(props) {
    super(props)
    this.renderFile = this.renderFile.bind(this)
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
    } else {
      return this.props.actions.remove(fileId, token);
    }
  }
  renderFile(file, i ) {
    const time = moment(file.date_created).fromNow()
    const type = file.type.split('/')[1];
    const attributes = {'data-fileId': file._id};
    if (file.type.split('/')[0] !== 'image'){
    return(
      <ContextMenuTrigger id="file-context-menu" key={i} attributes={attributes}>
      <div className={'col-md-2 col-xs-6 doc-div'} >
           <div className="image-wrapper">
             <FileImg type={type}/>
           </div>
          <p className="filename">
              <i className="flaticon-file flaticon-interface"></i>
              {file.name}</p>
          <p className="filetime">{time}</p>
      </div>
      </ContextMenuTrigger>
    );
  } else {
    return(
      <ContextMenuTrigger id="file-context-menu" key={i} attributes={attributes}>
      <div className="col-md-2 col-xs-6 image-div" >
          <div className="image-wrapper" onClick={() => this.handleClick(`${ROOT_URL}/image/full/${file.name}`)}>
              <img src={`${ROOT_URL}/image/${file.name}`} alt="' " className="image img-fluid img-rounded"/>
          </div>
          <p className="filename">
              <i className="flaticon-file flaticon-photo"></i>
              {file.name}</p>
          <p className="filetime">{time}</p>
      </div>
      </ContextMenuTrigger>
    );
  }
  }
  render() {
    return(
      <div className="row">
        {this.props.files.map(this.renderFile)}
        <ContextMenus handleClick={this.handleClicks}/>
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
