import React, { Component } from "react";

import MaterialTable from "material-table";

class NewTable extends Component {
  render() {
    if (this.props.loading) {
      return <div>loading...</div>;
    }
    return (
      <MaterialTable
        title={this.props.title}
        columns={[
          { title: "Location", field: "Location" },
          { title: "Address", field: "Address" },
          { title: "Country", field: "Country" },
          {
            title: "Count",
            field: "Count",
            type: "numeric",
          },
          { title: "Status", field: "Status" },
        ]}
        data={this.props.dens}
      />
    );
  }
}

export default NewTable;
