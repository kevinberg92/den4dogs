import React from "react";
import NewTable from "../tables/NewTable.component";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import Grid from "@material-ui/core/Grid";

export default class Dens extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      dens: null,
      user: "",
      authLevel: 0,
      identifier: "",
      sessions: null,
      densLoading: true,
      sessionsLoading: true,
      denColumns: [
        { title: "Serial", field: "Serial" },
        { title: "Location", field: "Location" },
        { title: "Country", field: "Country" },
        { title: "Address", field: "Address" },
        { title: "Usage count", field: "Usage_count" },
        { title: "Usage last 24h", field: "Usage_last_24h" },
        { title: "Average daily last 7d(min)", field: "Average_daily_last_7d" },
        {
          title: "Average daily last 30d(min)",
          field: "Average_daily_last_30d",
        },
      ],
      sessionColumns: [
        { title: "Date", field: "date" },
        { title: "Den serial", field: "Serial" },
        { title: "Location", field: "Location_name" },
        { title: "Phone", field: "phone_nr" },
        { title: "Dog", field: "name" },
        { title: "Duration", field: "session_time" },
      ],
    };
  }

  async componentDidMount() {
    await this.checkUser();
    await this.getData();
  }

  async getData() {
    let urlDens = "";
    let urlSessions = "";

    switch (this.state.authLevel) {
      case 1:
        urlDens = "http://localhost:3000/api/den_usage/den-detail/restricted/1";
        urlSessions = "http://localhost:3000/api/den_usage/detail/restricted/1";
        break;

      case 2:
        urlDens =
          "http://localhost:3000/api/den_usage/den-detail/restricted/2/" +
          this.state.identifier;
        urlSessions =
          "http://localhost:3000/api/den_usage/detail/restricted/2/" +
          this.state.identifier;
        break;

      case 3:
        urlDens =
          "http://localhost:3000/api/den_usage/den-detail/restricted/3/" +
          this.state.identifier;
        urlSessions =
          "http://localhost:3000/api/den_usage/detail/restricted/3/" +
          this.state.identifier;
        break;

      default:
        this.setState({ error: true });
        break;
    }

    try {
      const densResponse = await fetch(urlDens);
      const densData = await densResponse.json();
      const sessionsResponse = await fetch(urlSessions);
      const sessionsData = await sessionsResponse.json();
      this.setState({
        dens: densData.data,
        densLoading: false,
        sessions: sessionsData.data,
        sessionsLoading: false,
      });
    } catch (error) {
      this.setState({ error: true });
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
    switch (data.data[0].auth_level) {
      case 2:
        this.setState({ identifier: data.data[0].country });
        break;
      case 3:
        this.setState({ identifier: data.data[0].location });
        break;
      case 1:
        break;
      default:
        this.setState({ error: true });
        break;
    }
    this.setState({
      user: data.data[0].email,
      authLevel: data.data[0].auth_level,
    });
  }

  render() {
    if (this.state.densLoading && this.state.sessionsLoading) {
      return <Loading />;
    } else if (this.state.error === true) {
      return <Error />;
    }
    return (
      <Grid
        display="flex"
        container
        spacing={3}
        style={{
          marginTop: "6rem",
          width: "100%",
          marginLeft: "2rem",
          marginRight: "1rem",
        }}
      >
        <Grid item xs={12}>
          <NewTable
            columns={this.state.denColumns}
            dens={this.state.dens}
            title={"Dens"}
          />
        </Grid>
        <Grid item xs={12}>
          <NewTable
            columns={this.state.sessionColumns}
            dens={this.state.sessions}
            title={"Sessions"}
          />
        </Grid>
      </Grid>
    );
  }
}
