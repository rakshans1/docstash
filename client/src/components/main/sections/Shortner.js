import React, {PropTypes} from 'react';
import Input from '../../auth/Input';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shortActions from '../../../actions/shortnerActions';

class Shortner extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      url: ''
    };
    this.validateUrl = this.validateUrl.bind(this);
    this.handleUrlInput = this.handleUrlInput.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.renderShortnerMessage = this.renderShortnerMessage.bind(this);
  }
  validateUrl(event) {
    let re = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    return re.test(event);
  }
  handleUrlInput(event) {
    this.setState({
      url: event.target.value
    });
  }
  saveAndContinue(e) {
    e.preventDefault();

    let canProceed = this.validateUrl(this.state.url);
      if(canProceed) {
        let data = {
          url: this.state.url,
        };
        this.props.actions.addShortner(data.url);
      } else {
        this.refs.url.isValid();
      }
  }
  renderShortnerMessage() {
    if (this.props.shortner.value !== null) {
      const {shortner, input} = this.props.shortner;
      return(
        <div className="card card-inverse card-outline-success text-xs-center shortner-link">
          <div className="card-block">
              <p>{input} has been Shortned to</p>
              <a target="_blank" href={shortner}>{shortner}</a>
          </div>
        </div>
      );
    }
  }
  render() {
    return(
      <div className="col-sm-8 col-xs-12 shortner">
        <h1 className="text-sm-center shortner_h1">Link Shortner</h1>
        <div className="row">
          <div className="col-sm-2"/>
          <div className="col-sm-8">
            <form onSubmit={this.saveAndContinue}>
                <Input
                text="Enter Url to shorten"
                ref="url"
                type="text"
                validate={this.validateUrl}
                value={this.state.url}
                onChange={this.handleUrlInput}
                errorMessage="Url is invalid"
                emptyMessage="Url can't be empty"
                errorVisible={this.state.showUrlError}
                />
                <button
                  type="submit"
                  className="button button_wide">
                  Shorten Link
                </button>
            </form>
        </div>
        </div>
        {this.renderShortnerMessage()}
      </div>


    );
  }
}
Shortner.propTypes = {
  shortner: PropTypes.object,
  actions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return{ shortner: state.shortner };
}
function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(shortActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProp)(Shortner);
