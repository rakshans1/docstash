import React, {PropTypes} from 'react';

class PdfView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
            <embed src={this.props.payload.url} width="780" height="400" type='application/pdf'/>
          </div>
        );
    }
}
PdfView.propTypes = {
    payload: PropTypes.object,
};

export default PdfView;