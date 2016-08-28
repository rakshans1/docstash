import React from 'react';

class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);

  }
  render(){
    return(
      <div className="breadcrum-div">
        <ol className="breadcrumb">
          <li className="breadcrumb-item ">Library</li>
          <i className="fa fa-angle-down breadcrum-dropdown" aria-hidden="true"/>
        </ol>
    </div>
    );
  }
}

export default Breadcrumb;
