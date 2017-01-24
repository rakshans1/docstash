import React, {PropTypes} from 'react';
import moment from 'moment';
import FileImg from './FileImg';
import ROOT_URL from '../../../../baseurl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../../../actions/modalActions';
import {ContextMenuTrigger } from 'react-contextmenu';
import {ContextMenusFile} from '../../../common/ContextMenu';
import * as fileActions from '../../../../actions/fileActions';
import FileIcon from './FileIcon';

class FilesView extends React.Component {
  constructor(props) {
    super(props)
    this.renderGrid = this.renderGrid.bind(this);
    this.renderList = this.renderList.bind(this);
  }
  renderGrid() {
    const file = this.props.file;
    const token = this.props.token;
    const time = moment(file.createdAt).fromNow()
    const attributes = {'data-fileId': file._id, 'data-fileName': file.name};
    const type = file.type.split('/')[0];
    const type1 = file.type.split('/')[1];
    if ( type !== 'image' && type !== 'video' && type !== 'audio' && type1 !== 'pdf'){
    return(
      <ContextMenuTrigger id="file-context-menu"  attributes={attributes}>
      <div className={'col-md-2 col-xs-6 doc-div'} >
           <div className="image-wrapper">
             <FileImg type={file.type}/>
           </div>
           <div className="tooltip">
           <p className="filename">
             <FileIcon type={file.type.split('/')[0]}/>
                {file.name}</p>
             <span className="tooltiptext">{file.name}</span>
           </div>
          <p className="filetime">{file.size} {time}</p>
      </div>
      </ContextMenuTrigger>
    );
  } else if (type === 'video' || type === 'audio' || type1 == 'pdf') {
    return(
      <ContextMenuTrigger id="file-context-menu" attributes={attributes}>
      <div className="col-md-2 col-xs-6 doc-div pointer" >
          <div className="image-wrapper" onClick={() => this.props.handleClick(type, `${ROOT_URL}/video/${file._id}?token=${token}`, file.name, type1)}>
              <FileImg type={file.type}/>
          </div>
          <div className="tooltip">
          <p className="filename">
            <FileIcon type={file.type.split('/')[0]}/>
               {file.name}</p>
            <span className="tooltiptext">{file.name}</span>
          </div>
          <p className="filetime">{file.size} {time}</p>
      </div>
      </ContextMenuTrigger>
    );
  }else {
    return(
      <ContextMenuTrigger id="file-context-menu" attributes={attributes}>
      <div className="col-md-2 col-xs-6 image-div pointer" >
          <div className="image-wrapper" onClick={() => this.props.handleClick('img', `${ROOT_URL}/image/full/${file._id}?token=${token}`)}>
              <img src={`${ROOT_URL}/image/${file._id}?token=${token}`} alt="' " className="image img-fluid img-rounded"/>
          </div>
          <div className="tooltip">
          <p className="filename">
            <FileIcon type={file.type.split('/')[0]}/>
               {file.name}</p>
            <span className="tooltiptext">{file.name}</span>
          </div>
          <p className="filetime">{file.size} {time}</p>
      </div>
      </ContextMenuTrigger>
    );
  }
  }
  renderList() {
    const file = this.props.file;
    const token = this.props.token;
    const time = moment(file.createdAt).fromNow()
    const attributes = {'data-fileId': file._id, 'data-fileName': file.name};
    const type = file.type.split('/')[0]
    if ( type !== 'image' && type !== 'video' && type !== 'audio' && type1 !== 'pdf'){
    return(
      <tr >
          <td><ContextMenuTrigger id="file-context-menu" attributes={attributes}><FileIcon type={file.type.split('/')[0]}/> {file.name}</ContextMenuTrigger></td>
          <td><ContextMenuTrigger id="file-context-menu" attributes={attributes}>{time}</ContextMenuTrigger></td>
          <td><ContextMenuTrigger id="file-context-menu" attributes={attributes}>{file.size}</ContextMenuTrigger></td>
      </tr>
    );
  } else if (type === 'video' || type === 'audio' || type1 === 'pdf') {
    return(
      <tr onClick={() => this.props.handleClick(type, `${ROOT_URL}/video/${file._id}?token=${token}`, file.name)}>
          <td><ContextMenuTrigger id="file-context-menu" attributes={attributes}><FileIcon type={file.type.split('/')[0]}/> {file.name}</ContextMenuTrigger></td>
          <td><ContextMenuTrigger id="file-context-menu" attributes={attributes}>{time}</ContextMenuTrigger></td>
          <td><ContextMenuTrigger id="file-context-menu" attributes={attributes}>{file.size}</ContextMenuTrigger></td>
      </tr>
    );
  }else {
    return(
      <tr onClick={() => this.props.handleClick('img', `${ROOT_URL}/image/full/${file._id}?token=${token}`)}>
          <td><ContextMenuTrigger id="file-context-menu" attributes={attributes}><FileIcon type={file.type.split('/')[0]}/> {file.name}</ContextMenuTrigger></td>
          <td><ContextMenuTrigger id="file-context-menu" attributes={attributes}>{time}</ContextMenuTrigger></td>
          <td><ContextMenuTrigger id="file-context-menu" attributes={attributes}>{file.size}</ContextMenuTrigger></td>
      </tr>
    );
  }
  }
  render() {
    if (this.props.view === "grid") {
      return this.renderGrid();
    } else {
      return this.renderList();
    }

  }

}
FilesView.propTypes = {
    files: PropTypes.array,
    view: PropTypes.string
};

export default FilesView;
