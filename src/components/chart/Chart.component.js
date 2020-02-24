import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";

class Chart extends React.Component {
  render() {
    return (
      <div className="chart">
        Chart Component
        {console.log(this.props.dens)}
        <Bar data={this.props.dens} options={{}} />
      </div>
    );
  }
}
export default Chart;
