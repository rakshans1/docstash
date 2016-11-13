import React, {PropTypes} from 'react';

class FileImg extends React.Component {
    render() {
        switch (this.props.type) {
                //File Types
            case 'application/msword':
                return (
                  <img src={require(`../../../../assets/icon/doc.svg`)} className="image img-fluid img-rounded" alt=""/>
                );

            case 'text/plain':
                return (
                  <img src={require(`../../../../assets/icon/txt.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'text/html':
                return (
                  <img src={require(`../../../../assets/icon/html.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'text/css':
                return (
                  <img src={require(`../../../../assets/icon/css.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'application/x-msdos-program':
                return (
                  <img src={require(`../../../../assets/icon/exe.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'application/javascript':
                return (
                  <img src={require(`../../../../assets/icon/js.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'application/json':
                return (
                  <img src={require(`../../../../assets/icon/json.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'application/pdf':
                return (
                  <img src={require(`../../../../assets/icon/pdf.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'audio/mp3':
                return (
                  <img src={require(`../../../../assets/icon/mp3.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'video/mp4':
                return (
                  <img src={require(`../../../../assets/icon/mp4.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'application/zip':
                return (
                  <img src={require(`../../../../assets/icon/zip.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'application/rar':
                return (
                  <img src={require(`../../../../assets/icon/rar.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'video/x-msvideo':
                return (
                  <img src={require(`../../../../assets/icon/avi.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            default:
                return(
                  <img src={require(`../../../../assets/icon/file-flat.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
        }
    }
}
FileImg.propTypes = {
    type: PropTypes.string.isRequired
};
export default FileImg;
