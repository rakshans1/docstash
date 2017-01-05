import React, {PropTypes} from 'react';
import axios from 'axios';
import ROOT_URL from '../../../../baseurl'
import {move} from '../../../../actions/fileActions';

class FileMove extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          folders: []
        };
        this.renderFolder = this.renderFolder.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
      axios.get(`${ROOT_URL}/folders?folderId=${this.props.folderId}`, {
          headers: {
              authorization: this.props.token
          }
        }).then(res => {
          var folders = []
          this.setState({folders: res.data});
        })
          .catch(err => console.log(err));

    }
    handleClick (fileId, folderId) {
      this.props.move(fileId, folderId, this.props.token ,this.props.location);
    }
    renderFolder(folder, i) {
      return (
        <li key={i} style={{'list-style-type': 'none'}}>
          <div onClick={() => this.handleClick(this.props.fileId, folder._id)}>{folder.name}</div>
          <FileMove folderId={folder._id} token={this.props.token} fileId={this.props.fileId} move={this.props.move} location={this.props.location}/>
        </li>
      );
    }
    render() {
        return (
            <ul>
            {this.state.folders.map(this.renderFolder)}
            </ul>
        );
    }
}
FileMove.propTypes = {
    payload: PropTypes.object
};

export default FileMove;
