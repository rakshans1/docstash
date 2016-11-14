import React, {PropTypes} from 'react';
import {IndexLink, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as modalActions from '../../actions/modalActions';
import units from '../../utils/units';

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
            return this.props.actions.showModal("Upload");
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
                        <Link className="sidebar-a" to="/recents"><i className="flaticon-square"/>Recent</Link>
                    </li>
                </ul>
                <p className="sidebar-text">FILTER BY</p>
                <ul className="nav nav-sidebar sidebar-ul">
                    <li className="sidebar-li">
                        <Link className="sidebar-a" to="/documents"><i className="flaticon-interface"/>Documents</Link>
                    </li>
                    <li className="sidebar-li">
                        <Link className="sidebar-a" to="/videos"><i className="flaticon-multimedia"/>Videos</Link>
                    </li>
                    <li className="sidebar-li">
                        <Link className="sidebar-a" to="/musics"><i className="flaticon-music"/>Music</Link>
                    </li>
                    <li className="sidebar-li">
                        <Link className="sidebar-a" to="/images"><i className="flaticon-photo"/>Images</Link>
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
                    <progress className="progress" value={((this.props.storage/1000000000)/10)*100} max="100">{(this.props.storage/10)*100}%</progress>
                    <p className="usage-capacity">
                        {units(this.props.storage)} / 10 GB</p>
                </div>
            </div>
        );
    }
}
Sidebar.propTypes = {
    modal: PropTypes.bool,
    storage: PropTypes.number,
    actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {modal: state.modal.status, storage: state.user.storage};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(modalActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(Sidebar);
