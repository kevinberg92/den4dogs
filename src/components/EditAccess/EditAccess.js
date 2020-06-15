import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import NewTable from "../tables/NewTable.component";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./EditAccess.css";

class EditAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: "",
      authLevel: 0,
      identifier: "",
      usersList: [],
      locations: [],
      authOptions: [],
      error: false,
      enteredCountry: null,
      enteredLevel: null,
      enteredLocation: null,
      enteredUsername: null,
      tableColumns: [
        { title: "User", field: "email" },
        { title: "Access level", field: "auth_level", type: "numeric" },
        { title: "Country", field: "country" },
        { title: "Location", field: "location" },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    await this.checkUser();
    await this.getUsers();
    await this.getLocations();
    this.setState({ isLoading: false });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    const updatedUser = {
      userName: this.state.enteredUsername,
      authLevel: this.state.enteredLevel,
      location: this.state.enteredLocation,
      country: this.state.enteredCountry,
      id: null,
    };
    this.state.usersList.forEach((user) => {
      if (user.email === updatedUser.userName) {
        updatedUser.id = user.id;
      }
    });
    console.log(updatedUser);
    if (
      updatedUser.userName == null ||
      updatedUser.authLevel == null ||
      updatedUser.location == null ||
      updatedUser.country == null ||
      updatedUser.id == null
    ) {
      toast.error("All fields must be filled out...");
      event.preventDefault();
    } else {
      const url = "http://localhost:3000/api/users/update";
      axios
        .post(url, updatedUser)
        .then((response) => {
          console.log(response.data);
          this.setState({
            enteredCountry: null,
            enteredLevel: null,
            enteredLocation: null,
            enteredUsername: null,
          });
          toast.success("User successfully updated!");
          this.getUsers();
        })
        .catch((error) => {
          if (error.response) {
            toast.error("Error updating user...");
          }
          console.log(error);
        });
      event.preventDefault();
    }
  }

  async getUsers() {
    let url = "";
    const level = this.state.authLevel;
    if (level === 1) {
      url = "http://localhost:3000/api/users/all-access";
    } else if (level === 2) {
      url = "http://localhost:3000/api/users/country/" + this.state.identifier;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ usersList: data.data });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, error: true });
    }
  }

  async getLocations() {
    let url = "";
    const level = this.state.authLevel;
    if (level === 1) {
      url = "http://localhost:3000/api/dens/locations";
    } else if (level === 2) {
      url =
        "http://localhost:3000/api/dens/locations/c/" + this.state.identifier;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.setState({ locations: data.data });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, error: true });
    }
  }

  async checkUser() {
    var idProp = "";
    const response = await fetch("http://localhost:3000/api/users/access", {
      method: "post",
      body: "email=" + this.props.userName,
      headers: { "Content-type": "application/x-www-form-urlencoded" },
    });
    const data = await response.json();
    console.log("FETCHED DATA" + JSON.stringify(data.data[0]));
    switch (data.data[0].auth_level) {
      case 2:
        idProp = "country";
        this.setState({ authOptions: [0, 3] });
        break;
      case 1:
        idProp = "location";
        this.setState({ authOptions: [0, 1, 2, 3] });
        break;
      default:
        idProp = "";
        break;
    }
    this.setState({
      user: data.data[0].email,
      authLevel: data.data[0].auth_level,
      identifier: data.data[0].country,
    });
    console.log("EDIT ACCESS STATE: " + this.state.user);
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else if (this.state.error) {
      return <Error />;
    }

    if (this.state.authLevel === 1) {
      return (
        <Grid
          display="flex"
          container
          spacing={3}
          style={{
            marginTop: "100px",
            width: "100%",
            marginLeft: "2rem",
            marginRight: "1rem",
          }}
        >
          <Grid item sm={12} md={12}>
            <NewTable
              columns={this.state.tableColumns}
              dens={this.state.usersList}
              title={"Users access"}
            />
          </Grid>

          <Grid item sm={12} md={12}>
            <Paper>
              <Form
                style={{
                  width: "95%",
                  margin: "auto",
                  padding: "1rem",
                }}
                onSubmit={this.handleSubmit}
              >
                <Form.Group controlId="hideCouserControlntrol">
                  <Form.Label>User</Form.Label>
                  <Form.Control
                    name="enteredUsername"
                    as="select"
                    onChange={this.handleChange}
                  >
                    <option hidden>Username</option>
                    {this.state.usersList.map((user, i) => (
                      <option key={i}>{user.email}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="locationControl">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    name="enteredLocation"
                    as="select"
                    onChange={this.handleChange}
                  >
                    <option hidden>Location</option>
                    {this.state.locations.map((location, i) => (
                      <option key={i}>{location.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="countryControl">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    name="enteredCountry"
                    as="select"
                    onChange={this.handleChange}
                  >
                    <option hidden>Country</option>
                    <option>Norway</option>
                    <option>Denmark</option>
                    <option>Sweden</option>
                    <option>Finland</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="authLevelControl">
                  <Form.Label>Access level</Form.Label>
                  <Form.Control
                    name="enteredLevel"
                    as="select"
                    onChange={this.handleChange}
                  >
                    <option hidden>Access level</option>
                    {this.state.authOptions.map((level, i) => (
                      <option key={i}>{level}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <ToastContainer autoClose={4000} />
                <Button variant="success" type="submit">
                  Submit
                </Button>
              </Form>
            </Paper>
          </Grid>
        </Grid>
      );
    } else if (this.state.authLevel === 2) {
      return (
        <Grid
          display="flex"
          container
          spacing={3}
          style={{
            marginTop: "100px",
            width: "100%",
            marginLeft: "2rem",
            marginRight: "1rem",
          }}
        >
          <Grid item sm={12} md={12}>
            <NewTable
              columns={this.state.tableColumns}
              dens={this.state.usersList}
              title={"Users access"}
            />
          </Grid>

          <Grid item sm={12} md={12}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="userNamControl">
                <Form.Label>User</Form.Label>
                <Form.Control
                  name="enteredUsername"
                  as="select"
                  onChange={this.handleChange}
                >
                  <option hidden>Username</option>
                  {this.state.usersList.map((user, i) => (
                    <option key={i}>{user.email}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="locationControl">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="enteredLocation"
                  as="select"
                  onChange={this.handleChange}
                >
                  <option hidden>Location</option>
                  {this.state.locations.map((location, i) => (
                    <option key={i}>{location.name}</option>
                  ))}
                </Form.Control>

                <Form.Group controlId="countryControl">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    name="enteredCountry"
                    as="select"
                    onChange={this.handleChange}
                  >
                    <option hidden>Country</option>
                    <option>Norway</option>
                    <option>Denmark</option>
                    <option>Sweden</option>
                    <option>Finland</option>
                  </Form.Control>
                </Form.Group>
              </Form.Group>
              <Form.Group controlId="authLevelControl">
                <Form.Label>Access level</Form.Label>
                <Form.Control
                  name="enteredLevel"
                  as="select"
                  onChange={this.handleChange}
                >
                  <option hidden>Access level</option>
                  {this.state.authOptions.map((level, i) => (
                    <option key={i}>{level}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <ToastContainer autoClose={4000} />
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          </Grid>
        </Grid>
      );
    }
  }
}

export default EditAccess;
