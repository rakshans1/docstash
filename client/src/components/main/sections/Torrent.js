import React, {PropTypes} from 'react';
import Input from '../../auth/Input';
import TorrentInfo from './torrent/TorrentInfo';
import TorrentSearch from './torrent/TorrentSearch';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as torrentActions from '../../../actions/torrentActions';

class Torrent extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        torrentInput:  null,
        showButton: null,
        buttonValue: ''
      };
      this.handletorrentInput = this.handletorrentInput.bind(this);
      this.saveAndContinue = this.saveAndContinue.bind(this);
  }
  handletorrentInput(event) {
    if ( /^https?:\/\//.test(event.target.value)) {
      var buttonValue = "Load Torrent";
      var showButton = "torrent";
    } else if (/^magnet:\?(.+)$/.test(event.target.value)) {
       buttonValue = "Load Magnet";
       showButton = "magnet";
    } else if (event.target.value) {
      buttonValue = "Search";
      showButton = "search";
    }
    this.setState({
      torrentInput: event.target.value,
      showButton: showButton,
      buttonValue: buttonValue
    });
  }

  saveAndContinue(e) {
    e.preventDefault();
    if (this.state.showButton === "search") {
      this.props.actions.torrentSearch(this.state.torrentInput);
    } else {
      this.props.actions.torrentLoad(this.state.showButton ,this.state.torrentInput, this.props.email);
    }
  }

  render () {
    return(
      <div className="col-sm-8 col-xs-12 torrents">
        <h2 className="text-sm-center shortner_h1">Torrent Downloader</h2>
        <form onSubmit={this.saveAndContinue}>
            <Input
            text="Enter search query, torrent URL or magnet URI"
            ref="torrentInput"
            type="text"
            // validate={this.validateUrl}
            value={this.state.torrentInput}
            onChange={this.handletorrentInput}
            errorMessage="Url is invalid"
            emptyMessage="Url can't be empty"
            // errorVisible={this.state.showUrlError}
            />
            {this.state.showButton ? <button
              type="submit"
              className="button button_center">
              {this.state.buttonValue}
            </button> : null}
        </form>
        {this.props.torrent.search.length > 0 ?  <TorrentSearch search={this.props.torrent.search} actions={this.props.actions} email={this.props.email}/> : null}
        <div className="torrents-header">
          <h5>Torrents</h5>
          <h6 className="torrents-downloading">Downloading {this.props.ws.filesDownloading ? this.props.ws.filesDownloading : 0} files</h6>
        </div>

        {this.props.ws.torrents && this.props.ws.torrents.length > 0 ?   <TorrentInfo torrents={this.props.ws.torrents}/> :

        <div className="card card-block">
          <p className="text-xs-center">Add torrents above</p>
        </div> }

        <div className="torrents-header">
          <h5>Downloads</h5>
        </div>

        <div className="card card-block">
          <p className="text-xs-center">Download files above</p>
        </div>

      </div>
    );
  }
}
Torrent.propTypes = {
  actions: PropTypes.object.isRequired,
  torrent: PropTypes.object,
  ws: PropTypes.object,
  email: PropTypes.string
};
function mapStateToProps(state) {
  return{ torrent: state.torrent, ws: state.ws, email: state.user.email};
}
function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(torrentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProp)(Torrent);
