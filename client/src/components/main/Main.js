import React from 'react';

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
                <div className="row">

                    <div className="col-md-2 col-xs-6 image-div">
                        <div className="image-wrapper">
                            <img src="https://source.unsplash.com/category/food/135x135" alt="' " className="image img-fluid img-rounded"/>
                        </div>
                        <p className="filename">
                            <i className="flaticon-file flaticon-photo"></i>
                            Image1.jpg</p>
                        <p className="filetime">2 hours ago</p>
                    </div>

                    <div className="col-md-2 col-xs-6 image-div">
                        <div className="image-wrapper">
                            <img src="https://source.unsplash.com/category/technology/135x135" alt="" className="image img-fluid img-rounded"/>
                        </div>
                        <p className="filename">
                            <i className="flaticon-file flaticon-photo"></i>
                            Image1.jpg</p>
                        <p className="filetime">2 hours ago</p>
                    </div>

                    <div className="col-md-2 col-xs-6 image-div">
                        <div className="image-wrapper">
                            <img src="https://source.unsplash.com/category/buildings/135x135" alt="" className="image img-fluid img-rounded"/>
                        </div>
                        <p className="filename">
                            <i className="flaticon-file flaticon-photo"></i>
                            Image1.jpg</p>
                        <p className="filetime">2 hours ago</p>
                    </div>

                    <div className="col-md-2 col-xs-6 doc-div">
                        <div className="image-wrapper">
                            <img src={require('../../assets/icon/doc.svg')} className="image img-fluid img-rounded" alt=""/>
                        </div>
                        <p className="filename">
                            <i className="flaticon-file flaticon-interface"></i>
                            Document1.doc</p>
                        <p className="filetime">2 hours ago</p>
                    </div>

                    <div className="col-md-2 col-xs-6 doc-div">
                        <div className="image-wrapper">
                            <img src={require('../../assets/icon/pdf.svg')} className="image img-fluid img-rounded" alt=""/>
                        </div>
                        <p className="filename">
                            <i className="flaticon-file flaticon-interface"></i>
                            Document1.pdf</p>
                        <p className="filetime">2 hours ago</p>
                    </div>
                    <div className="col-md-2 col-xs-6 doc-div">
                        <div className="image-wrapper">
                            <img src={require('../../assets/icon/avi.svg')} className="image img-fluid img-rounded" alt=""/>
                        </div>
                        <p className="filename">
                            <i className="flaticon-file flaticon-multimedia"></i>
                            Video.avi</p>
                        <p className="filetime">2 hours ago</p>
                    </div>
                    <div className="col-md-2 col-xs-6 doc-div">
                        <div className="image-wrapper">
                            <img src={require('../../assets/icon/exe.svg')} className="image img-fluid img-rounded" alt=""/>
                        </div>
                        <p className="filename">
                            <i className="flaticon-file flaticon-interface"></i>
                            setup.exe</p>
                        <p className="filetime">2 hours ago</p>
                    </div>
                    <div className="col-md-2 col-xs-6 doc-div">
                        <div className="image-wrapper">
                            <img src={require('../../assets/icon/iso.svg')} className="image img-fluid img-rounded" alt=""/>
                        </div>
                        <p className="filename">
                            <i className="flaticon-file flaticon-interface"></i>
                            Game.iso</p>
                        <p className="filetime">2 hours ago</p>
                    </div>
                    <div className="col-md-2 col-xs-6 doc-div">
                        <div className="image-wrapper">
                            <img src={require('../../assets/icon/html.svg')} className="image img-fluid img-rounded" alt=""/>
                        </div>
                        <p className="filename">
                            <i className="flaticon-file flaticon-interface"></i>
                            index.html</p>
                        <p className="filetime">2 hours ago</p>
                    </div>
                    <div className="col-md-2 col-xs-6 doc-div">
                        <div className="image-wrapper">
                            <img src={require('../../assets/icon/css.svg')} className="image img-fluid img-rounded" alt=""/>
                        </div>
                        <p className="filename">
                            <i className="flaticon-file flaticon-interface"></i>
                            main.css</p>
                        <p className="filetime">2 hours ago</p>
                    </div>

                </div>

            </div>
        );
    }
}
export default Main;
