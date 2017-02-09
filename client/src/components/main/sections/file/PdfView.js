import React, {PropTypes} from 'react';

class PdfView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
          <div>
            <embed src={this.props.payload.url} width="1050" height="580" type='application/pdf'/>
          </div>
        );
    }
}
PdfView.propTypes = {
    payload: PropTypes.object,
};

export default PdfView;