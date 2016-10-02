import React, {PropTypes} from 'react';
import Input from '../components/Input';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tweetActions from '../actions/twitterActions';

class Twitter extends React.Component {
  constructor(props) {
    super(props);
    this.state  = {
      phrase: ''
    };
    this.handlephraseInput = this.handlephraseInput.bind(this);
    this.saveAndContinue = this.saveAndContinue.bind(this);
    this.renderTweet = this.renderTweet.bind(this);
    this.sentimentImg = this.sentimentImg.bind(this);
  }
  handlephraseInput(event) {
    this.setState({
      phrase: event.target.value
    });
  }
  saveAndContinue(e) {
    e.preventDefault();
    if (this.state.phrase.length > 0 ) {
        let data = {
          phrase: this.state.phrase,
        };
        this.props.actions.addTwitter(data.phrase);
      } else {
        this.refs.phrase.isValid();
      }
  }



  renderTweet() {
    if (this.props.twitter.count !== 0) {
      const {count, sentiment, tweets, phrase} = this.props.twitter;
      return(
        <div className="card card-inverse card-outline-success text-xs-center twitter">
          <div className="card-block">
              <h1>Twitter is feeling about {phrase}</h1>
              {this.sentimentImg(sentiment, count)}
              <p>{count} Tweet till now</p>
              {tweets.map((tweet, i) => { return <p key={i} className="tweet">{ i +1} )  {tweet}</p>  })}
          </div>
        </div>
      );
    }
  }

  sentimentImg(sentiment, count) {
    var avg = sentiment / count;
    if (avg > 0.5) return <img src={require('../assets/img/excited.png')} /> //happy
    if (avg < -0.5) return <img src={require('../assets/img/angry.png')} /> //angry
    return <img src={require('../assets/img/normal.png')} /> //normal
  }
  render() {
    return(
      <div className="col-sm-8 col-xs-12 shortner">
        <h1 className="text-sm-center shortner_h1">Twitter Feeds</h1>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={this.saveAndContinue}>
                <Input
                text="Enter Phrase to scan Twitter"
                ref="phrase"
                type="text"
                value={this.state.phrase}
                onChange={this.handlephraseInput}
                errorMessage="phrase is invalid"
                emptyMessage="phrase can't be empty"
                errorVisible={this.state.showphraseError}
                />
                <button
                  type="submit"
                  className="button button_center">
                  Twitter Me
                </button>
            </form>
        </div>
        </div>
        {this.renderTweet()}
      </div>


    );
  }
}
Twitter.propTypes = {
  twitter: PropTypes.object,
  actions: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  return{ twitter: state.ws.twitter };
}
function mapDispatchToProp(dispatch) {
  return {
    actions: bindActionCreators(tweetActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProp)(Twitter);
