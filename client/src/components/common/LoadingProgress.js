import React, {PropTypes} from 'react';
import Nprogress from 'nprogress';

class ProgressBar extends React.Component {
  componentDidMount() {
   Nprogress.start();
  //  return null;
 }

 componentWillUnmount() {
   Nprogress.done();
  //  return null;
 }
  render() {
    return(
      <div></div>
    );
  }
}



 export default ProgressBar;
