import React from "react";
import NewTable from "../tables/NewTable.component";
import { Container, Row } from "react-bootstrap";
import Grid from '@material-ui/core/Grid';

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      loading: true,
      tableColumns: [
        { title: "Phone", field: "Phone" },
        { title: "E-mail", field: "Email" },
        { title: "Sign-up", field: "Sign-up" },
        { title: "Dog name", field: "Dog_name" },
        { title: "Breed", field: "Breed" },
        { title: "Dog weight", field: "Dog_weight" },
        { title: "Dog date of birth", field: "Dog_date_of_birth" },]
    };
  }

  async componentDidMount() {
    const url = "http://localhost:3000/api/users/";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      users: data.data,
      loading: false,
    });
  }
  render() {
    if (this.state.loading) {
      return <div>Loading....</div>;
    }
    return (
      <Grid display="flex" container spacing={3} style={{
        marginTop: "6rem",
        width: "100%",
        marginLeft: "2rem",
        marginRight: "1rem",
        width: "100%"
      }}>
        <Grid item xs={12}>
          <NewTable columns={this.state.tableColumns} dens={this.state.users} title={"All users"} />
        </Grid>

      </Grid>
      
    );
  }
}
