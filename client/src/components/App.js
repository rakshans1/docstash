// This component handles the App template used on every page.
import React, {PropTypes} from 'react';
import NotificationContainer from '../containers/Notification';
import Spinner from './common/Spinner';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Spinner />
        <NotificationContainer props/>
        {this.props.children}
      </div>
    );
  }
}


App.propTypes = {
  children: PropTypes.object.isRequired,
};


export default App;
