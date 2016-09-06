import React,{PropTypes} from 'react';
import {Link} from 'react-router';

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);
    this.renderBreadcrumb = this.renderBreadcrumb.bind(this);
  }
  renderBreadcrumb() {
    const location = this.props.location.pathname;
    switch(location) {
      case '/':
        return(
              <ol className="breadcrumb">
              <li className="breadcrumb-item "><Link to="/">Library</Link></li>
            </ol>
        );
      case '/recent':
        return(
              <ol className="breadcrumb">
              <li className="breadcrumb-item "><Link to="/">Library</Link></li>
              <li className="breadcrumb-item "><Link to="/recent">Recent</Link></li>
            </ol>
        );
      case '/documents':
        return(
              <ol className="breadcrumb">
              <li className="breadcrumb-item "><Link to="/">Library</Link></li>
              <li className="breadcrumb-item "><Link to="/documents">Documents</Link></li>
            </ol>
        );
      case '/videos':
        return(
              <ol className="breadcrumb">
              <li className="breadcrumb-item "><Link to="/">Library</Link></li>
              <li className="breadcrumb-item "><Link to="/videos">Videos</Link></li>
            </ol>
        );
      case '/music':
        return(
              <ol className="breadcrumb">
              <li className="breadcrumb-item "><Link to="/">Library</Link></li>
              <li className="breadcrumb-item "><Link to="/music">Music</Link></li>
            </ol>
        );
      case '/images':
        return(
              <ol className="breadcrumb">
              <li className="breadcrumb-item "><Link to="/">Library</Link></li>
              <li className="breadcrumb-item "><Link to="/images">Images</Link></li>
            </ol>
        );
      case '/short':
        return(
              <ol className="breadcrumb">
              <li className="breadcrumb-item ">Extra</li>
              <li className="breadcrumb-item "><Link to="/short">Shortner</Link></li>
            </ol>
        );
        case '/torrent':
          return(
                <ol className="breadcrumb">
                <li className="breadcrumb-item ">Extra</li>
                <li className="breadcrumb-item "><Link to="/torrent">Torrent</Link></li>
              </ol>
          );
      default:
          return false;
    }

  }
  render(){
    return(
      <div>
        {this.renderBreadcrumb()}
      </div>
    );
  }
}
Breadcrumb.propTypes = {
  location: PropTypes.object
}
export default Breadcrumb;
