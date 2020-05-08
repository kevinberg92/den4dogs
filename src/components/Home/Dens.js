import React from "react";
import NewTable from "../tables/NewTable.component";
import Grid from '@material-ui/core/Grid';
import { Container, Row } from "react-bootstrap";

export default class Dens extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dens: null,
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
        { title: "Average daily last 30d(min)", field: "Average_daily_last_30d" },],
      sessionColumns: [
        { title: "Date", field: "date" },
        { title: "Den serial", field: "Serial" },
        { title: "Location", field: "Location_name" },
        { title: "Phone", field: "phone_nr" },
        { title: "Dog", field: "name" },
        { title: "Duration", field: "session_time" }]
    };
  }

  async componentDidMount() {
    const urlDens = "http://localhost:3000/api/den_usage/den-detail/restricted/1";
    const urlSessions = "http://localhost:3000/api/den_usage/detail/restricted/1";
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
    console.log(this.state.sessions)
  }
  render() {
    if (this.state.densLoading && this.state.sessionsLoading) {
      return <div>Loading....</div>;
    }
    return (
      <Grid display="flex" container spacing={3} style={{
        marginTop: "6rem",
        width: "100%",
        marginLeft: "2rem",
        marginRight: "1rem",
        width: "100%"
      }}>
        <Grid item xs={12}>
          <NewTable columns={this.state.denColumns} dens={this.state.dens} title={"Dens"} />
        </Grid>
        <Grid item xs={12}>
          <NewTable columns={this.state.sessionColumns} dens={this.state.sessions} title={"Sessions"} />
        </Grid>

      </Grid>
    );
  }
}
