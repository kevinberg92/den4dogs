import React from "react";
import NewTable from "../tables/NewTable.component";
import { Container, Row } from "react-bootstrap";

export default class Usage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      usage: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const url = "http://localhost:3000/api/den_usage";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      usage: data.data,
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
            <NewTable dens={this.state.usage} title={"All usage"} />
          </Row>
        </Container>
      </div>
    );
  }
}
