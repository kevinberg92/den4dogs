import React from "react";
import NewTable from "../tables/NewTable.component";
import Grid from "@material-ui/core/Grid";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      users: null,
      loading: true,
      tableColumns: [
        { title: "Phone", field: "Phone" },
        { title: "E-mail", field: "Email" },
        { title: "Sign-up", field: "Sign_up" },
        { title: "Dog name", field: "Dog_name" },
        { title: "Breed", field: "Breed" },
        { title: "Dog weight", field: "Dog_weight" },
        { title: "Dog date of birth", field: "Dog_date_of_birth" },
      ],
    };
  }

  async componentDidMount() {
    await this.checkUser();
    if (this.state.error === false) {
      const url = "http://localhost:3000/api/users/";
      const response = await fetch(url);
      const data = await response.json();
      this.setState({
        users: data.data,
        loading: false,
      });
    }
  }

  async checkUser() {
    try {
      const response = await fetch("http://localhost:3000/api/users/access", {
        method: "post",
        body: "email=" + this.props.userName,
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      });
      const data = await response.json();
      if (data.data[0].auth_level === 1) {
      } else {
        this.setState({ error: true, loading: false });
      }
    } catch (error) {
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else if (this.state.error === true) {
      return <Error />;
    }
    return (
      <Grid
        display="flex"
        container
        spacing={3}
        style={{
          marginTop: "6rem",
          width: "100%",
          marginLeft: "2rem",
          marginRight: "1rem",
        }}
      >
        <Grid item xs={12}>
          <NewTable
            columns={this.state.tableColumns}
            dens={this.state.users}
            title={"All users"}
          />
        </Grid>
      </Grid>
    );
  }
}
