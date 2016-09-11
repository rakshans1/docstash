import React, {PropTypes} from 'react';
import units from '../../../../utils/units';

class TorrentInfo extends React.Component {
  // constructor (props) {
  //   super(props);
  // }

  handleStop(hash) {
    this.props.actions.torrentStop(hash);
  }

  handleRemove(hash) {
    this.props.actions.torrentRemove(hash);
  }

  handleOpen(hash) {
    this.props.actions.torrentOpen(hash);
  }

  handlezipAll(hash) {
    this.props.actions.torrentzipAll(hash);
  }

  handledownloadFile(hash, path) {
    this.props.actions.torrentdownloadFile(hash, path);
  }

  handlecancelFile(hash, path) {
    this.props.actions.torrentcancelFile(hash, path);
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
         <div className="col-md-6 col-sm-12 col-xs-12 text-sm-right">
           <div className="torrent-status">
             <span>{units(torrent.status.down)}</span>
             <span> ({units(torrent.status.downps)}/s)</span>
             <img src={require('../../../../assets/icon/download.svg')} className="torrent-download-icon" alt=""/>
           </div>
            { torrent.open ?<a className="torrent-action torrent-zip" onClick={() => this.handlezipAll(torrent.hash)}><img src={require('../../../../assets/icon/save.svg')} className="torrent-icon" alt=""/>
             <span>Zip</span>
           </a>: <a className="torrent-action torrent-zip" onClick={() => this.handleOpen(torrent.hash)}><img src={require('../../../../assets/icon/play.svg')} className="torrent-icon" alt=""/>
            <span>Start</span>
          </a>}
           { torrent.open ?<a className="torrent-action torrent-stop" onClick={() => this.handleStop(torrent.hash)}> <img src={require('../../../../assets/icon/stop.svg')} className="torrent-icon" alt=""/>
             <span>Stop</span>
           </a> : <a className="torrent-action torrent-stop" onClick={() => this.handleRemove(torrent.hash)}> <img src={require('../../../../assets/icon/delete.svg')} className="torrent-icon" alt=""/>
             <span>Remove</span>
           </a>}
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
                <td className="text-sm-right table-file"><div className="file-name"><div className="torrent-progress-bar" style={{width: ((file.downloadLength/file.length)*90)+5 +'%'}} ></div>{file.name}</div></td>
                <td>{units(file.length)}</td>
                <td className="torrent-download">{file.downloading ? <img src={require('../../../../assets/icon/red-stop.svg')} className="torrent-downloading-icon" alt="" onClick={() => this.handlecancelFile(torrent.hash, file.path)} />: <img src={require('../../../../assets/icon/cloud-download.svg')} className="torrent-downloading-icon" onClick={() => this.handledownloadFile(torrent.hash, file.path)} alt="" />}</td>
              </tr>)
            })}
           <tr>
             <td className="text-sm-right">{torrent.files.length} Files</td>
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
  torrents: PropTypes.array.isRequired,
  actions: PropTypes.object
}
export default TorrentInfo;
