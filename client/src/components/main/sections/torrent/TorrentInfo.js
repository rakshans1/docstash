import React from 'react';

class TorrentInfo extends React.Component {
  render() {
    return(
      <div className="card card-block">
       <div className="row torrent-info-row">
        <div className="col-md-8 col-sm-12 col-xs-12 torrent-name">
          <span>Ubuntu 16.04.1 LTS</span>
          <div className="torrent-hash">#82d59fbb29ec43f27ada98sdfd5d8f696b7268746</div>
        </div>
        <div className="col-md-4 col-sm-12 col-xs-12 text-xs-right">
          <div className="torrent-status">
            <span>0 B</span>
            <span> (0 B/s)</span>
            <img src={require('../../../../assets/icon/download.svg')} className="torrent-download-icon" alt=""/>
          </div>
          <a className="torrent-action torrent-zip"><img src={require('../../../../assets/icon/save.svg')} className="torrent-icon" alt=""/>
            <span>Zip</span>
          </a>
          <a className="torrent-action torrent-stop"><img src={require('../../../../assets/icon/stop.svg')} className="torrent-icon" alt=""/>
            <span>Stop</span>
          </a>
        </div>
      </div>



      <div className="table-responsive">
      <table className="table table-striped table-bordered ">
        <thead className="thead-default">
          <tr>
            <th className="text-xs-right">File</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-xs-right table-file">Readme.txt</td>
            <td>341 B</td>
            <td className="torrent-download"><img src={require('../../../../assets/icon/red-stop.svg')} className="torrent-downloading-icon" alt=""/></td>
          </tr>
          <tr>
            <td className="text-xs-right table-file">Ubuntu 16.04.1 LTS.iso</td>
            <td>883 MB</td>
            <td className="torrent-download"><img src={require('../../../../assets/icon/cloud-download.svg')} className="torrent-downloading-icon" alt=""/></td>
          </tr>
          <tr>
            <td className="text-xs-right">2 Files</td>
            <td>883 MB Total</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      </div>

      </div>
    );
  }
}
export default TorrentInfo;
