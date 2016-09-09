import React, {PropTypes} from 'react';
import units from '../../../../utils/units';

class TorrentInfo extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    const torrentInfo = this.props.torrents.map((torrent, i) => {
      return(
      <div key={i} className="card card-block torrent-info">
      {torrent.openning ? <div className="spinner-overlay"><div className="spinner spinner-torrent"><span/><span/><span/></div></div> : null}
        <div className="row torrent-info-row">
         <div className="col-md-6 col-sm-12 col-xs-12 torrent-name">
           <span>{torrent.name}</span>
           <div className="torrent-hash">#{torrent.hash}</div>
         </div>
         <div className="col-md-6 col-sm-12 col-xs-12 text-xs-right">
           <div className="torrent-status">
             <span>{units(torrent.status.down)}</span>
             <span> ({units(torrent.status.downps)}/s)</span>
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
       {torrent.open && torrent.files ? <div className="table-responsive">
       <table className="table table-striped table-bordered ">
         <thead className="thead-default">
           <tr>
             <th className="text-xs-right">File</th>
             <th>Size</th>
             <th></th>
           </tr>
         </thead>
         <tbody>
             {torrent.files.map((file, i) => {
              return(<tr key={i}>
                <td className="text-xs-right table-file">{file.name}</td>
                <td>{units(file.length)}</td>
                <td className="torrent-download">{file.downloading ? <img src={require('../../../../assets/icon/red-stop.svg')} className="torrent-downloading-icon" alt=""/>: <img src={require('../../../../assets/icon/cloud-download.svg')} className="torrent-downloading-icon" alt=""/>}</td>
              </tr>)
            })}
           <tr>
             <td className="text-xs-right">{torrent.files.length} Files</td>
             <td>{units(torrent.length)} Total</td>
             <td></td>
           </tr>
         </tbody>
       </table>
       </div> : <p className="torrent-inactive">This torrent is inactive. Press the green power button to reactivate or the red trash can to remove it.</p>}
      </div>
    );
  });

  return <div>{torrentInfo}</div>

  }
}
TorrentInfo.propTypes = {
  torrents: PropTypes.array.isRequired
}
export default TorrentInfo;
