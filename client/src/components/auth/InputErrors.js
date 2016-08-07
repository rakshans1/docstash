import React, {PropTypes} from 'react';
import classNames from 'classnames';

class InputError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Input in invalid'
    };
}

  render() {
    let errorclass = classNames({
      'error_container': true,
      'visible': this.props.visible,
      invisible: !this.props.visible
    });

    return (
      <div className={errorclass}>
        <span>{this.props.errorMessage}</span>
      </div>
    );
  }
}
InputError.propTypes = {
  visible: PropTypes.bool,
  errorMessage: PropTypes.string
};
export default InputError;
