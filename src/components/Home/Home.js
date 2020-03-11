import React from "react";
import DenTable from "../tables/DenTable.component";
import { Container, Row } from "react-bootstrap";
import MaterialTable from "../tables/MaterialTable.component";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      densMost: null,
      densLeast: null,
      oneHour: null,
      test: null,
      loading: true
    };
  }

  async componentDidMount() {
    const url = "http://localhost:3000/api/dens/usage";
    const response = await fetch(url);
    const data = await response.json();
    const url2 = "http://localhost:3000/api/dens/usage";
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    this.setState({
      densMost: Array.from(data.data).slice(0, 10),
      densLeast: Array.from(data.data)
        .reverse()
        .slice(0, 10),
      oneHour: data2.data,
      test: Array.from(data.data).map(item => {
        var k = Object.keys(item);
        return item[k[3]];
      }),
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
            <MaterialTable
              dens={this.state.densMost}
              title={"Most used dens"}
            />
            <MaterialTable
              dens={this.state.densLeast}
              title={"Least used dens"}
            />
            <MaterialTable
              dens={this.state.oneHour}
              title={"Use of one hour"}
            />
            <MaterialTable
              dens={this.state.oneHour}
              title={"Use of one hour"}
            />
          </Row>
        </Container>
      </div>
    );
  }
}
