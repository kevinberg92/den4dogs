import React from "react";
import MapComponent from "../map/map.component";
import { Container, Row, Col } from "react-bootstrap";
import NewTable from "../tables/NewTable.component";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { flexbox } from '@material-ui/system';

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
      tableColumns: [
        { title: "Location", field: "Location" },
        { title: "Address", field: "Address" },
        { title: "Country", field: "Country" },
        {
          title: "Count",
          field: "Count",
          type: "numeric",
        },
        { title: "Status", field: "Status"},
     ]
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
      
        <Grid display="flex" container spacing={3} style={{
          marginTop: "100px",
          width: "100%",
          marginLeft: "2rem",
          marginRight: "1rem",
          width: "100%"
         }}>

          <Grid item sm={12} md={6}>
            <NewTable columns={this.state.tableColumns} dens={this.state.densMost} title={"Most used dens"}/>
          </Grid>

          <Grid item sm={12} md={6}>
            <NewTable columns={this.state.tableColumns} dens={this.state.densLeast} title={"Least used dens"} />  
          </Grid>

          <Grid item sm={12} md={6}>
            <NewTable columns={this.state.tableColumns} dens={this.state.oneHour} title={"Use of one hour"} />
          </Grid>
          <Grid sm={12} md={6} style={{padding: "12px", borderRadius: "5px"}}>
           
              <MapComponent />
          
         </Grid>

         
        </Grid>
          
        
      
    );
  }
}
