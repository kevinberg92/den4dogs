import React from "react";
import NewTable from "../tables/NewTable.component";
import { Container, Row } from "react-bootstrap";

export default class Dens extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dens: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const url = "http://localhost:3000/api/dens";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      dens: data.data,
      loading: false,
    });
  }
  render() {
    if (this.state.loading) {
      return <div>Loading....</div>;
    }
    return (
      <div>
        <Container>
          <Row>
            <NewTable dens={this.state.dens} title={"All dens"} />
          </Row>
        </Container>
      </div>
    );
  }
}
