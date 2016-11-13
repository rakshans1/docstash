import React, {PropTypes} from 'react';

class FileIcon extends React.Component {
    render() {
        switch (this.props.type) {
                //File Types
            case 'video':
                return (
                  <i className="flaticon-file flaticon-multimedia"></i>
                );
            case 'audio':
                return (
                  <i className="flaticon-file flaticon-music"></i>
                );
            case 'image':
                return (
                  <i className="flaticon-file flaticon-photo"></i>
                );
            case 'edit':
                return (
                  <i className="flaticon flaticon-draw edit"></i>
                );
            case 'delete':
                return (
                  <i className="flaticon flaticon-file delete"></i>
                );
            case 'added':
                return (
                  <i className="flaticon flaticon-file-1 added"></i>
                );

            default:
                return(
                  <i className="flaticon-file flaticon-interface"></i>
                );
        }
    }
}
FileIcon.propTypes = {
    type: PropTypes.string.isRequired
};
export default FileIcon;
