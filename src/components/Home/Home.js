import React from "react";
import MapComponent from "../map/map.component";
import Error from "../Error/Error";
import NewTable from "../tables/NewTable.component";
import Dens from "./Dens";
import Grid from "@material-ui/core/Grid";
import Loading from "../Loading/Loading";

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
      user: null,
      authLevel: null,
      identifier: null,
      error: false,
      tableColumns: [
        { title: "Location", field: "Location" },
        { title: "Address", field: "Address" },
        { title: "Country", field: "Country" },
        {
          title: "Count",
          field: "Count",
          type: "numeric",
        },
        { title: "Status", field: "Status" },
      ],
    };
  }

  async componentDidMount() {
    await this.checkUser();
    if (this.state.authLevel === 1 || this.state.authLevel === 2) {
      await this.getData();
    }
    this.setState({ loading: false });
  }

  async getData() {
    let level2Data = [];
    const url = "http://localhost:3000/api/dens/usage";
    const response = await fetch(url);
    const data = await response.json();

    const url2 = "http://localhost:3000/api/dens/usage";
    const response2 = await fetch(url2);
    const data2 = await response2.json();

    if (this.state.authLevel === 1) {
      this.setState({
        densMost: Array.from(data.data).slice(0, 10),
        densLeast: Array.from(data.data).reverse().slice(0, 10),
        oneHour: Array.from(data2.data),
        oneTest: Array.from(data.data),
        test: Array.from(data.data).map((item) => {
          var k = Object.keys(item);
          return item[k[3]];
        }),
      });
    } else if (this.state.authLevel === 2) {
      data.data.map((den) => {
        if (den.Country === this.state.identifier) {
          level2Data.push(den);
        }
      });
      this.setState({
        densMost: Array.from(level2Data).slice(0, 10),
        densLeast: Array.from(level2Data).reverse().slice(0, 10),
        oneHour: Array.from(level2Data),
        oneTest: Array.from(level2Data),
        test: Array.from(level2Data).map((item) => {
          var k = Object.keys(item);
          return item[k[3]];
        }),
      });
    }
  }

  async checkUser() {
    var idProp = "";
    try {
      const response = await fetch("http://localhost:3000/api/users/access", {
        method: "post",
        body: "email=" + this.props.userName,
        headers: { "Content-type": "application/x-www-form-urlencoded" },
      });
      const data = await response.json();
      switch (data.data[0].auth_level) {
        case 2:
          this.setState({ identifier: data.data[0].country });
          break;
        case 3:
          this.setState({ identifier: data.data[0].location });
          break;
        default:
          idProp = "";
          break;
      }
      this.setState({
        user: data.data[0].email,
        authLevel: data.data[0].auth_level,
      });
    } catch (error) {
      this.setState({ error: true });
    }
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else if (this.state.error === true) {
      return <Error />;
    } else if (this.state.authLevel === 3) {
      return <Dens userName={this.props.userName} />;
    }
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
        <Grid item sm={12} md={6}>
          <NewTable
            columns={this.state.tableColumns}
            dens={this.state.densMost}
            title={"Most used dens"}
          />
        </Grid>

        <Grid item sm={12} md={6}>
          <NewTable
            columns={this.state.tableColumns}
            dens={this.state.densLeast}
            title={"Least used dens"}
          />
        </Grid>
        <Grid
          item
          sm={12}
          md={12}
          style={{ padding: "12px", borderRadius: "5px", height: "30rem" }}
        >
          <MapComponent />
        </Grid>
      </Grid>
    );
  }
}
