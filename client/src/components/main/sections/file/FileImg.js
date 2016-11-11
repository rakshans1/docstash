import React, {PropTypes} from 'react';

class FileImg extends React.Component {
    render() {
        switch (this.props.type) {
                //File Types
            case 'doc':
                return (
                  <img src={require(`../../../../assets/icon/doc.svg`)} className="image img-fluid img-rounded" alt=""/>
                );

            case 'plain':
                return (
                  <img src={require(`../../../../assets/icon/txt.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            case 'png':
                return (
                  <img src={require(`../../../../assets/icon/png.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
            default:
                return(
                  <img src={require(`../../../../assets/icon/txt.svg`)} className="image img-fluid img-rounded" alt=""/>
                );
        }
    }
}
FileImg.propTypes = {
    type: PropTypes.string.isRequired
};
export default FileImg;
