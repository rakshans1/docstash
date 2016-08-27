import React, {PropTypes} from 'react';
import Sidebar from '../main/Sidebar';
import Recent from '../main/Recent';

class Home extends React.Component  {
  constructor(props){
    super(props);
  }
  render() {
    const props = this.props.props;
    return(
      <div className="container-fluid">
      <div className="row">
        <Sidebar/>
        {props.children}
        <Recent/>
      </div>
      </div>
    );
  }
}
Home.propTypes = {
  props: PropTypes.object.isRequired,
};
export default Home;
