import React, { Component } from "react";
import DenTable from "../tables/DenTable.component";
import { Container, Row } from "react-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      densMost: null,
      densLeast: null,
      loading: true
    };
  }

  async componentDidMount() {
    const url = "http://localhost:3000/api/dens/usage";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      densMost: Array.from(data.data).slice(0, 10),
      densLeast: Array.from(data.data)
        .reverse()
        .slice(0, 10),
      loading: false
    });
    console.log(this.state.densMost);
  }
  render() {
    if (this.state.loading) {
      return <div>Loading....</div>;
    }
    return (
      <div>
        <Container>
          <Row>
            <DenTable dens={this.state.densMost} title={"Most used dens"} />
            <DenTable dens={this.state.densLeast} title={"Least used dens"} />
          </Row>
        </Container>
      </div>
    );
  }
}
