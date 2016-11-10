import React, {PropTypes} from 'react';
import {IndexLink, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../actions/modalActions';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if (!this.props.modal) {
            return this.props.actions.showModal();
        }
        this.props.actions.hideModal();
    }
    render() {
        return (
            <div className="col-sm-2 sidebar">
                <button className="sidebar-btn" onClick={this.handleClick}>
                    Upload</button>
                <p className="sidebar-text">MAIN MENU</p>
                <ul className="nav nav-sidebar sidebar-ul">
                    <li className="sidebar-li">
                        <IndexLink className="sidebar-a" activeClassName="active" to="/"><i className="flaticon-folder-2"/>Library</IndexLink>
                    </li>
                    <li className="sidebar-li">
                        <a className="sidebar-a" href="recent.html"><i className="flaticon-square"/>Recent</a>
                    </li>
                </ul>
                <p className="sidebar-text">FILTER BY</p>
                <ul className="nav nav-sidebar sidebar-ul">
                    <li className="sidebar-li">
                        <a className="sidebar-a" href="documents.html"><i className="flaticon-interface"/>Documents</a>
                    </li>
                    <li className="sidebar-li">
                        <a className="sidebar-a" href="videos.html"><i className="flaticon-multimedia"/>Videos</a>
                    </li>
                    <li className="sidebar-li">
                        <a className="sidebar-a" href="music.html"><i className="flaticon-music"/>Music</a>
                    </li>
                    <li className="sidebar-li">
                        <a className="sidebar-a" href="images.html"><i className="flaticon-photo"/>Images</a>
                    </li>
                </ul>
                <p className="sidebar-text">Extra</p>
                <ul className="nav nav-sidebar sidebar-ul">
                    <li className="sidebar-li">
                        <Link className="sidebar-a" activeClassName="active" to="/torrent"><i className="flaticon-torrent"/>Torrent Download</Link>
                    </li>
                    <li className="sidebar-li">
                        <Link className="sidebar-a" activeClassName="active" to="/youtube"><i className="flaticon-youtube"/>Youtube Player</Link>
                    </li>
                    <li className="sidebar-li">
                        <Link className="sidebar-a" activeClassName="active" to="/weather"><i className="flaticon-weather"/>Weather Report</Link>
                    </li>
                    <li className="sidebar-li">
                        <Link className="sidebar-a" activeClassName="active" to="/twitter"><i className="flaticon-twitter"/>Twitter Feeds</Link>
                    </li>
                    <li className="sidebar-li">
                        <Link className="sidebar-a" activeClassName="active" to="/short"><i className="flaticon-link"/>Link Shortner</Link>
                    </li>
                </ul>
                <div className="usage">
                    <p className="usage-use">USAGE</p>
                    <progress className="progress" value="0" max="100">{(this.props.storage/10)*100}%</progress>
                    <p className="usage-capacity">
                        {this.props.storage} / 10 GB</p>
                </div>
            </div>
        );
    }
}
Sidebar.propTypes = {
    modal: PropTypes.bool,
    storage: PropTypes.string,
    actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {modal: state.modal, storage: state.user.storage};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(modalActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(Sidebar);
