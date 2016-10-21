import React, {PropTypes} from 'react';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';

let array = [];

function data(data) {
  if (data)
  array.push(data);
  if (array.length > 30) array.shift()
  return [...array, data];
}

const TorrentChart =  (props) => {
  return(
    <Sparklines data={data(props.data)} limit={30}>
        <SparklinesLine color="#1c8cdc" />
        <SparklinesSpots />
    </Sparklines>
  );
}
TorrentChart.propTypes = {
  data: PropTypes.number,
}
export default TorrentChart;
