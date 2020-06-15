import React from "react";
import { Bar } from "react-chartjs-2";

class Chart extends React.Component {
  render() {
    return (
      <div className="chart">
        Chart Component
        <Bar data={this.props.dens} options={{}} />
      </div>
    );
  }
}
export default Chart;
