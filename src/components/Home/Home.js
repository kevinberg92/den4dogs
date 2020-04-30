import React from "react";
import MapComponent from "../map/map.component";
import { Container, Row, Col } from "react-bootstrap";
import NewTable from "../tables/NewTable.component";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      densMost: null,
      densLeast: null,
      oneHour: null,
      test: null,
      loading: true,
      oneTest: null,
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
      densLeast: Array.from(data.data).reverse().slice(0, 10),
      oneHour: Array.from(data2.data),
      oneTest: Array.from(data.data),
      test: Array.from(data.data).map((item) => {
        var k = Object.keys(item);
        return item[k[3]];
      }),
      loading: false,
    });
    console.log(data2.data);
    console.log("data 1");
    console.log(data.data);
  }
  render() {
    if (this.state.loading) {
      return <div>Loading....</div>;
    }
    return (
      <div>
        <Row>
          <Col>
            <NewTable dens={this.state.densMost} title={"Most used dens"} />
          </Col>
          <Col>
            <NewTable dens={this.state.densLeast} title={"Least used dens"} />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewTable dens={this.state.oneTest} title={"Most used dens!"} />
            <NewTable dens={this.state.oneHour} title={"Use of one hour"} />
          </Col>
          <Col>
            <MapComponent />
          </Col>
        </Row>
      </div>
    );
  }
}
