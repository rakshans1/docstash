import React, {PropTypes} from 'react';
import Input from '../../auth/Input';
import TorrentInfo from './torrent/TorrentInfo';

class Torrent extends React.Component {
  render () {
    return(
      <div className="col-sm-8 col-xs-12 torrents">
        <h2 className="text-sm-center shortner_h1">Torrent Downloader</h2>
        <form onSubmit={this.saveAndContinue}>
            <Input
            text="Enter search query, torrent URL or magnet URI"
            ref="url"
            type="text"
            // validate={this.validateUrl}
            // value={this.state.url}
            // onChange={this.handleUrlInput}
            errorMessage="Url is invalid"
            emptyMessage="Url can't be empty"
            // errorVisible={this.state.showUrlError}
            />
            <button
              type="submit"
              className="button button_center">
              Load Torrent
            </button>
        </form>
        <div className="torrents-header">
          <h5>Torrents</h5>
          <h6 className="torrents-downloading">Downloading 0 files</h6>
        </div>

        <TorrentInfo />

        <div className="card card-block">
          <p className="text-xs-center">Add torrents above</p>
        </div>

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

export default Torrent;
