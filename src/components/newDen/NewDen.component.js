import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class NewDen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      hide: "",
      country: "",
      currency: "",
      lat: "",
      lng: "",
      address: "",
      street: "",
      zip: "",
      city: "",
      area: "",
      start_price: "",
      start_price_duration: "",
      min_price1: "",
      min_price1_duration: "",
      min_price2: "",
      min_price2_duration: "",
      min_price3: "",
      max_price: "",
      info1: "",
      info2: "",
      logo_url: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const url = "http://localhost:3000/api/dens/location";

    const newDenInfo = {
      name: this.state.name,
      hide: this.state.hide,
      country: this.state.country,
      currency: this.state.currency,
      lat: this.state.lat,
      lng: this.state.lng,
      address: this.state.address,
      street: this.state.street,
      zip: this.state.zip,
      city: this.state.city,
      area: this.state.area,
      start_price: this.state.start_price,
      start_price_duration: this.state.start_price_duration,
      min_price1: this.state.min_price1,
      min_price1_duration: this.state.min_price1_duration,
      min_price2: this.state.min_price2,
      min_price2_duration: this.state.min_price2_duration,
      min_price3: this.state.min_price3,
      max_price: this.state.max_price,
      info1: this.state.info1,
      info2: this.state.info2,
      logo: this.state.logo
    };

    console.log(newDenInfo);

    axios
      .post(url, newDenInfo)
      .then(response => {
        console.log(response.data);
        this.setState({
          name: "",
          hide: "",
          country: "",
          currency: "",
          lat: "",
          lng: "",
          address: "",
          street: "",
          zip: "",
          city: "",
          area: "",
          start_price: "",
          start_price_duration: "",
          min_price1: "",
          min_price1_duration: "",
          min_price2: "",
          min_price2_duration: "",
          min_price3: "",
          max_price: "",
          info1: "",
          info2: "",
          logo_url: ""
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
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="nameControl">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="hideControl">
          <Form.Label>Show/Hide</Form.Label>
          <Form.Control name="hide" as="select" onChange={this.handleChange}>
            <option hidden>Choose to hide or show</option>
            <option>0</option>
            <option>1</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="countryControl">
          <Form.Label>Country</Form.Label>
          
            {this.props.authLevel === 2 ?
            (<Form.Control name="country" as="select" onChange={this.handleChange}>
            <option hidden>Choose country</option>
            <option>{this.props.identifier}</option>
            </Form.Control>) :
            (<Form.Control name="country" as="select" onChange={this.handleChange}>
              <option hidden>Choose country</option>
              <option>Norway</option>
              <option>Denmark</option>
              <option>Sweden</option>
              <option>Finland</option>
              <option>Estonia</option>
              </Form.Control>)}
            
          
        </Form.Group>
        <Form.Group controlId="currencyControl">
          <Form.Label>Currency</Form.Label>
          <Form.Control
            name="currency"
            as="select"
            onChange={this.handleChange}
          >
            <option hidden>Choose currency</option>
            <option>NOK</option>
            <option>SEK</option>
            <option>DKK</option>
            <option>EUR</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="latitudeControl">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            name="lat"
            type="text"
            placeholder="Latitude"
            value={this.state.lat}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="longtitudeControl">
          <Form.Label>Longtitude</Form.Label>
          <Form.Control
            name="lng"
            type="text"
            placeholder="Longtitude"
            value={this.state.lng}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="addressControl">
          <Form.Label>Address</Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Address"
            value={this.state.address}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="streetControl">
          <Form.Label>Street</Form.Label>
          <Form.Control
            name="street"
            type="text"
            placeholder="Street"
            value={this.state.street}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="zipControl">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            name="zip"
            type="text"
            placeholder="Zip"
            value={this.state.zip}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="cityControl">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="City"
            value={this.state.city}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="areaControl">
          <Form.Label>Area</Form.Label>
          <Form.Control
            name="area"
            type="text"
            placeholder="Area"
            value={this.state.area}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="startPriceControl">
          <Form.Label>Starting Price</Form.Label>
          <Form.Control
            name="start_price"
            type="text"
            placeholder="Starting Price"
            value={this.state.start_price}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="startPriceDurationControl">
          <Form.Label>Starting price duration</Form.Label>
          <Form.Control
            name="start_price_duration"
            type="text"
            placeholder="Starting price duration"
            value={this.state.start_price_duration}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="min_price1Control">
          <Form.Label>Minimum price 1</Form.Label>
          <Form.Control
            name="min_price1"
            type="text"
            placeholder="Minimum price 1"
            value={this.state.min_price1}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="min_price1_durControl">
          <Form.Label>Minimum price 1 duration</Form.Label>
          <Form.Control
            name="min_price1_duration"
            type="text"
            placeholder="Minimum price 1 duration"
            value={this.state.min_price1_duration}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="min_price2Control">
          <Form.Label>Minimum price 2</Form.Label>
          <Form.Control
            name="min_price2"
            type="text"
            placeholder="Minimum price 2"
            value={this.state.min_price2}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="min_price2_durControl">
          <Form.Label>Minimum price 2 duration</Form.Label>
          <Form.Control
            name="min_price2_duration"
            type="text"
            placeholder="Minimum price 2 duration"
            value={this.state.min_price2_duration}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="min_price3Control">
          <Form.Label>Minimum price 3</Form.Label>
          <Form.Control
            name="min_price3"
            type="text"
            placeholder="Minimum price 3"
            value={this.state.min_price3}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="max_priceControl">
          <Form.Label>Maximum price</Form.Label>
          <Form.Control
            name="max_price"
            type="text"
            placeholder="Maximum price"
            value={this.state.max_price}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="map_infoControl">
          <Form.Label>Map Info</Form.Label>
          <Form.Control
            name="info1"
            type="text"
            placeholder="Map info"
            value={this.state.info1}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="den_infoControl">
          <Form.Label>Den info</Form.Label>
          <Form.Control
            name="info2"
            type="text"
            placeholder="Den info"
            value={this.state.info2}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="logoControl">
          <Form.Label>Logo url</Form.Label>
          <Form.Control
            name="logo_url"
            type="text"
            placeholder="Logo url"
            value={this.state.logo_url}
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
export default NewDen;
