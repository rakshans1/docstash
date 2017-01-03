import React, {PropTypes} from 'react';

class FileMove extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
              <img src={this.props.url} alt="' " className="image-full img-fluid img-rounded"/>
          </div>
        );
    }
}
FileMove.propTypes = {
    url: PropTypes.string,
};

export default FileMove;
