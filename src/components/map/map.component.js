import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import PacmanLoader from "react-spinners/PacmanLoader";
import CircleLoader from "react-spinners/CircleLoader";
import RotateLoader from "react-spinners/RotateLoader";
import "./map.css"
import 'leaflet/dist/leaflet.css';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const den_icon = L.icon({
    iconUrl: "https://img.icons8.com/color/48/000000/dog-house.png",
    iconSize: [25, 25]
  });

  


export default class MapComponent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lat: null,
            lng: null,
            locations: [],
            isLoading: true
        };
    }
    
    async componentDidMount(){
        const url = "http://localhost:3000/api/dens/locations/all";
        try {
            const response = await fetch(url);
            const data = await response.json();
            this.setState({
                locations: Array.from(data.data),
                isLoading: false            
            });
            console.log(this.state.locations);
        } catch (error) {
            console.log("Error fetching locations data, error: " + error);
        }
    }
    
    render() {
        if (this.state.isLoading) {
            return (
                <div className="sweet-loading">
                <RotateLoader
                    css={override}
                    size={150}
                    color={"#123abc"}
                    loading={this.state.isLoading}
                    />
            </div>
        );
        } else {
            console.log(this.state.locations)
            return (
                <Map center={[63.1, 16.3]} zoom={4.45}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    {this.state.locations.map(location => (
                        <Marker
                            key={location.ID}
                            icon={den_icon}
                            position={[
                                location.lat,
                                location.lng    
                            ]}>
                            <Popup>
                                LOCATION: {location.name} <br /> INFO: {location.info1}
                            </Popup>
                        </Marker>
                    ))}
                </Map>
            )
        }
            
  }
}

