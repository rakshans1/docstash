import React, {PropTypes} from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';

function average(data) {
  const sum = data.reduce(function(a, b) { return a + b; });
  return  Math.floor(sum / data.length);
}

const WeatherChart =  (props) => {
  return(
    <div>
      <Sparklines height={120} width={180} data={props.data}>
        <SparklinesLine color={props.color} />
        <SparklinesReferenceLine type="avg"/>
      </Sparklines>
      <div className="text-xs-center">{average(props.data)} {props.units}</div>
    </div>
  );
}
WeatherChart.propTypes = {
  data: PropTypes.array,
  color: PropTypes.string,
  units: PropTypes.string
}
export default WeatherChart;
