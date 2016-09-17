import React, {PropTypes} from 'react';
import units from '../../../../utils/units';

class TorrentSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(hash) {
    this.props.actions.torrentLoad("magnet" ,hash, this.props.email);
  }

  render() {
    const searchResult = this.props.search.map( (search, i) => {
      return(
        <tr key={i}>
          <td className=" table-search">{search.title}</td>
          <td>{units(search.size)}</td>
          <td className="torrent-search-status"><span className="torrent-seed">{search.seeds}</span><span className="torrent-leech"> {search.leechs}</span></td>
          <td className="torrent-download"><img src={require('../../../../assets/icon/search-download.svg')} className="torrent-downloading-icon" alt=""  onClick={() => this.handleClick(search.hash)}/></td>
        </tr>
      );
    });
    return (
      <div>
      <div className="torrents-header">
        <h5>Search Result for {this.props.input}</h5>
        <h6 className="torrents-downloading">Total {this.props.search.length} files</h6>
      </div>
      <div className="card card-block">
      <div className="table-responsive torrent-search">
        <table className="table table-striped table-bordered ">
          <tbody>
            {searchResult}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    );
  }
}

TorrentSearch.propTypes ={
  search: PropTypes.array,
  actions: PropTypes.object,
  email: PropTypes.string,
  input: PropTypes.string
}
export default TorrentSearch;
