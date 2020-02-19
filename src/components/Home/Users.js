import React from "react";
import DenTable from "../tables/DenTable.component";
import { Container, Row } from "react-bootstrap";

export default class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      loading: true
    };
  }

  async componentDidMount() {
    const url = "http://localhost:3000/api/users";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      users: data.data,
      loading: false
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
            <DenTable dens={this.state.users} title={"All users"} />
          </Row>
        </Container>
      </div>
    );
  }
}
