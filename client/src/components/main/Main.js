import React, {PropTypes} from 'react';
import File from './sections/File';
import {connect} from 'react-redux';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container-fluid library">
                <h2>Folders</h2>
                <div className="row">

                    <div className="col-md-2 col-xs-6 folder-div">
                        <a href="">
                            <div className="folder">
                                <p className="foldername">
                                    <i className="flaticon flaticon-folder"></i>Folder1</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-2 col-xs-6 folder-div">
                        <a href="">
                            <div className="folder">
                                <p className="foldername">
                                    <i className="flaticon flaticon-folder"></i>Folder1</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-2 col-xs-6 folder-div">
                        <a href="">
                            <div className="folder">
                                <p className="foldername">
                                    <i className="flaticon flaticon-folder"></i>Folder1</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-2 col-xs-6 folder-div">
                        <a href="">
                            <div className="folder">
                                <p className="foldername">
                                    <i className="flaticon flaticon-folder"></i>Folder1</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-2 col-xs-6 folder-div">
                        <a href="">
                            <div className="folder">
                                <p className="foldername">
                                    <i className="flaticon flaticon-folder"></i>Folder1</p>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-2 col-xs-6 folder-div">
                        <a href="">
                            <div className="folder">
                                <p className="foldername">
                                    <i className="flaticon flaticon-folder"></i>Folder1</p>
                            </div>
                        </a>
                    </div>
                </div>
                <h2>Files</h2>
                    <File files={this.props.files}/>
            </div>
        );
    }
}
Main.propTypes = {
    token: PropTypes.string,
};
function mapStateToProps(state) {
    return { files: state.file};
}
export default connect(mapStateToProps, null)(Main);
