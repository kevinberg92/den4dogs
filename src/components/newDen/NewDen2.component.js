import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class NewDen2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      serial: "",
      cage_nr: "",
      loading: true,
      idInfo: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const url = "http://localhost:3000/api/dens/locations";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      idInfo: Array.from(data.data),
      loading: false
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const url = "http://localhost:3000/api/dens/den";

    const newDenInfo = {
      id: this.state.id,
      serial: this.state.serial,
      cage_nr: this.state.cage_nr
    };

    console.log(newDenInfo);

    axios
      .post(url, newDenInfo)
      .then(response => {
        console.log(response.data);
        this.setState({
          id: "",
          serial: "",
          cage_nr: ""
        });
        toast.success("New location registered!");
      })
      .catch(error => {
        if (error.response) {
          toast.error("Error registrering new location");
        }
        console.log(error);
      });

    event.preventDefault();
  }
  render() {
    if (this.state.loading) {
      return <div>Loading....</div>;
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="idControl">
          <Form.Label>Location ID</Form.Label>
          <Form.Control name="id" as="select" onChange={this.handleChange}>
            <option>Velg sted</option>
            {this.state.idInfo.map((option, index) => {
              return (
                <option key={index} value={option.ID}>
                  {option.name}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="serialControl">
          <Form.Label>Serial No</Form.Label>
          <Form.Control
            name="serial"
            type="text"
            placeholder="Serial No"
            value={this.state.serial}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="cageControl">
          <Form.Label>Den nr at location</Form.Label>
          <Form.Control
            name="cage_nr"
            type="text"
            placeholder="Den nr at location"
            value={this.state.cage_nr}
            onChange={this.handleChange}
          />
        </Form.Group>
        <ToastContainer autoClose={4000} />
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}
export default NewDen2;
