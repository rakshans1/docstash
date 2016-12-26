import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as viewAction from '../../actions/viewAction';

class Breadcrumb extends React.Component {
    constructor(props) {
        super(props);
        this.renderBreadcrumb = this.renderBreadcrumb.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.props.actions.viewAction();
    }
    renderBreadcrumb() {
        const location = this.props.location.pathname;
        switch (location) {
            case '/':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">
                            <Link to="/">Library</Link>
                        </li>
                    </ol>
                );
            case '/folder':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">
                            <Link to="/">Library</Link>
                        </li>
                    </ol>
                );
            case '/setting':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">Profile</li>
                        <li className="breadcrumb-item ">
                            <Link to="/setting">Setting</Link>
                        </li>
                    </ol>
                );
            case '/recents':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">
                            <Link to="/">Library</Link>
                        </li>
                        <li className="breadcrumb-item ">
                            <Link to="/recent">Recent</Link>
                        </li>
                    </ol>
                );
            case '/documents':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">
                            <Link to="/">Library</Link>
                        </li>
                        <li className="breadcrumb-item ">
                            <Link to="/documents">Documents</Link>
                        </li>
                    </ol>
                );
            case '/videos':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">
                            <Link to="/">Library</Link>
                        </li>
                        <li className="breadcrumb-item ">
                            <Link to="/videos">Videos</Link>
                        </li>
                    </ol>
                );
            case '/musics':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">
                            <Link to="/">Library</Link>
                        </li>
                        <li className="breadcrumb-item ">
                            <Link to="/music">Music</Link>
                        </li>
                    </ol>
                );
            case '/images':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">
                            <Link to="/">Library</Link>
                        </li>
                        <li className="breadcrumb-item ">
                            <Link to="/images">Images</Link>
                        </li>
                    </ol>
                );
            case '/short':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">Extra</li>
                        <li className="breadcrumb-item ">
                            <Link to="/short">Shortner</Link>
                        </li>
                    </ol>
                );
            case '/torrent':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">Extra</li>
                        <li className="breadcrumb-item ">
                            <Link to="/torrent">Torrent</Link>
                        </li>
                    </ol>
                );
            case '/twitter':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">Extra</li>
                        <li className="breadcrumb-item ">
                            <Link to="/twitter">Twitter</Link>
                        </li>
                    </ol>
                );
            case '/youtube':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">Extra</li>
                        <li className="breadcrumb-item ">
                            <Link to="/youtube">Youtube</Link>
                        </li>
                    </ol>
                );
            case '/weather':
                return (
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item ">Extra</li>
                        <li className="breadcrumb-item ">
                            <Link to="/weather">Weather</Link>
                        </li>
                    </ol>
                );
            default:
                return false;
        }

    }
    render() {
        return (
            <div className="row">
              <div className="col-md-11">
                {this.renderBreadcrumb()}
              </div>
              <div className="col-md-1">
                {this.props.view === "list" ?
                <img src={require('../../assets/icon/grid.svg')} className="view" onClick={() => this.handleClick()} alt=""/>
                :
                <img src={require('../../assets/icon/list.svg')} className="view" onClick={() => this.handleClick()} alt=""/> }
              </div>
            </div>
        );
    }
}
Breadcrumb.propTypes = {
    location: PropTypes.object,
    actions: PropTypes.object.isRequired,
}
function mapStateToProps(state) {
    return {view: state.view};
}
function mapDispatchToProp(dispatch) {
    return {
        actions: bindActionCreators(viewAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProp)(Breadcrumb);
