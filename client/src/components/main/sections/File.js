import React, {PropTypes} from 'react';
import moment from 'moment';
import FileImg from './file/FileImg';

class Files extends React.Component {
  constructor(props) {
    super(props)
    this.renderFile = this.renderFile.bind(this)
  }
  renderFile(file, i ) {
    const time = moment(file.date_created).fromNow()
    const type = file.type.split('/')[1];
    if (file.type.split('/')[0] !== 'image'){
    return(
      <div className={'col-md-2 col-xs-6 doc-div'} key={i}>
           <div className="image-wrapper">
             <FileImg type={type}/>
           </div>
          <p className="filename">
              <i className="flaticon-file flaticon-interface"></i>
              {file.name}</p>
          <p className="filetime">{time}</p>
      </div>
    );
  } else {
    return(
      <div className="col-md-2 col-xs-6 doc-div" key={i}>
          <div className="image-wrapper">
              <FileImg type={type}/>
          </div>
          <p className="filename">
              <i className="flaticon-file flaticon-photo"></i>
              {file.name}</p>
          <p className="filetime">{time}</p>
      </div>
    );
  }
  }
  render() {
    return(
      <div className="row">
        {this.props.files.map(this.renderFile)}
      </div>
    );
  }
}
Files.propTypes = {
  files: PropTypes.array
}
export default Files;
