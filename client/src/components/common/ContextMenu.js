import React from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

export class ContextMenusFile extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <ContextMenu id="file-context-menu">
        <MenuItem data={{action: 'Download'}} onClick={this.props.handleClick}>
          <img src={require('../../assets/icon/downloading.svg')} className="download-icon" alt=""/>
          Download
        </MenuItem>
        <MenuItem  data={{action: 'Rename'}} onClick={this.props.handleClick}>
          <img src={require('../../assets/icon/draw.svg')} className="download-icon" alt=""/>
          Rename
        </MenuItem>
        <MenuItem  data={{action: 'Remove'}} onClick={this.props.handleClick}>
          <img src={require('../../assets/icon/bin.svg')} className="download-icon" alt=""/>
          Remove
        </MenuItem>
      </ContextMenu>
    );
  }
}
export class ContextMenusFolders extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <ContextMenu id="folders-context-menu">
        <MenuItem  data={{action: 'Rename'}} onClick={this.props.handleClick}>
          <img src={require('../../assets/icon/draw.svg')} className="download-icon" alt=""/>
          Rename
        </MenuItem>
        <MenuItem  data={{action: 'Remove'}} onClick={this.props.handleClick}>
          <img src={require('../../assets/icon/bin.svg')} className="download-icon" alt=""/>
          Remove
        </MenuItem>
      </ContextMenu>
    );
  }
}
export class ContextMenusFolder extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return(
      <ContextMenu id="folder-context-menu">
        <MenuItem data={{action: 'File'}} onClick={this.props.handleClick}>
          <img src={require('../../assets/icon/new-add-folder.svg')} className="download-icon" alt=""/>
          New Folder
        </MenuItem>
        {/* <MenuItem  data={{action: 'Remove'}} onClick={this.props.handleClick}>
          <img src={require('../../assets/icon/bin.svg')} className="download-icon" alt=""/>
          Remove
        </MenuItem> */}
      </ContextMenu>
    );
  }
}
