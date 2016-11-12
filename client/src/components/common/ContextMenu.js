import React from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';

class ContextMenus extends React.Component {
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
        <MenuItem  data={{action: 'Remove'}} onClick={this.props.handleClick}>
          <img src={require('../../assets/icon/bin.svg')} className="download-icon" alt=""/>
          Remove
        </MenuItem>
      </ContextMenu>
    );
  }
}

export default ContextMenus;
