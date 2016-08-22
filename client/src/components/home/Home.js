import React from 'react';
import Sidebar from '../main/Sidebar';
import Main from '../main/Main';
import Recent from '../main/Recent';

const Home = () => {
  return(
    <div className="container-fluid">
    <div className="row">
      <Sidebar/>
      <Main/>
      <Recent/>
    </div>
    </div>
  );
};

export default Home;
