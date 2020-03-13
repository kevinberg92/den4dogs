import React, { Component } from "react";
import "./DenTable.Styles.css";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

class MaterialTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rowsPerPage: 10,
      page: 0
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  handleChangeRowsPerPage(event) {
    this.setState({ page: 0, rowsPerPage: +event.target.value });
  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  renderTableHeader() {
    let header = Object.keys(this.props.dens[0]);
    return header.map((key, index) => {
      return (
        <TableCell
          key={index}
          style={{ backgroundColor: "#eb301e", color: "white" }}
        >
          {key.toUpperCase()}
        </TableCell>
      );
    });
  }

  renderTableData() {
    return Array.from(this.props.dens).map((dens, index) => {
      let col = Object.keys(dens);
      return (
        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
          {col.map((val, index) => {
            return <TableCell key={index}>{dens[col[index]]}</TableCell>;
          })}
        </TableRow>
      );
    });
  }

  render() {
    if (this.props.loading) {
      return <div>loading...</div>;
    }
    if (this.props.dens.length <= 10) {
      return (
        <div className="box">
          <div>
            <h1 id="title">{this.props.title}</h1>
          </div>
          <div>
            <TableContainer className="container">
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>{this.renderTableHeader()}</TableRow>
                </TableHead>
                <TableBody>{this.renderTableData()}</TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      );
    }
    return (
      <div className="box2">
        <div>
          <h1 id="title">{this.props.title}</h1>
        </div>
        <div>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>{this.renderTableHeader()}</TableRow>
              </TableHead>
              <TableBody>
                {this.renderTableData().slice(
                  this.state.page * this.state.rowsPerPage,
                  this.state.page * this.state.rowsPerPage +
                    this.state.rowsPerPage
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={this.props.dens.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </div>
      </div>
    );
  }
}

export default MaterialTable;
