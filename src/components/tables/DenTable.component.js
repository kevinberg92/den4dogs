import React, { Component } from "react";
import "./DenTable.Styles.css";

class DenTable extends Component {
  renderTableHeader() {
    let header = Object.keys(this.props.dens[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderTableData() {
    return Array.from(this.props.dens).map((dens, index) => {
      let col = Object.keys(dens);
      return (
        <tr key={index}>
          {col.map((val, index) => {
            return <td key={index}>{dens[col[index]]}</td>;
          })}
        </tr>
      );
    });
  }

  render() {
    if (this.props.loading) {
      return <div>loading...</div>;
    }
    return (
      <div>
        <div>
          <h1 id="title">{this.props.title}</h1>
        </div>
        <div>
          <table>
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default DenTable;
