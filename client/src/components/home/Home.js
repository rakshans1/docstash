import React, {PropTypes} from 'react';
import Sidebar from '../main/Sidebar';
import Recent from '../main/Recent';
import Breadcrumb from '../main/Breadcrumb';

class Home extends React.Component  {
  constructor(props){
    super(props);
  }
  render() {
    // const props = this.props.props;
    return(
      <div className="container-fluid">
      <div className="row">
        <Sidebar {...this.props}/>
        <div className="col-sm-8 col-xs-12 main">
        <Breadcrumb {...this.props}/>
        {this.props.children}
        </div>
        <Recent {...this.props}/>
      </div>
      </div>
    );
  }
}
Home.propTypes = {
  children: PropTypes.object,
};
export default Home;
