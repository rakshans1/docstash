import React, {PropTypes} from 'react';
import ROOT_URL from '../../../../baseurl';
import units from '../../../../utils/units';

class TorrentDownload extends React.Component {
    render() {
        const torrentDownload = this.props.uploads.map((upload, i) => {
            return (
                <div key={i} className="row padding-top fadeIn">
                    <div className="col-xs-8">{upload.name}</div>
                    <div className="col-xs-2">
                      {units(upload.size)}
                    </div>
                    <div className="col-xs-2">
                        <a className="torrent-action torrent-downloads" href={`${ROOT_URL}/torrent/d/${upload.name}`}>
                            <img src={require('../../../../assets/icon/torrent-download.svg')} className="torrent-icon" alt=""/>
                            <span>Download</span>
                        </a>
                    </div>

                </div>
            );
        });
        return (
            <div className="card card-block ">
                {torrentDownload}
            </div>
        );
    }
}

TorrentDownload.propTypes = {
    uploads: PropTypes.array
}
export default TorrentDownload
