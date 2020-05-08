import React, { Component } from "react";

import MaterialTable from "material-table";

class NewTable extends Component {
  render() {
    if (this.props.loading) {
      return <div>loading...</div>;
    }
    return (
      <MaterialTable
      style={{ width: "100%" }}
        title={this.props.title}
        columns={this.props.columns}
        data={this.props.dens}
      />
    );
  }
}

export default NewTable;


