import React from "react";
import MenuDrawer from "../SideMenu/SideMenu.component";


import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import AddIcon from "@material-ui/icons/Add";
import BusinessIcon from "@material-ui/icons/Business";
import LockIcon from '@material-ui/icons/Lock';


export default class MenuWrapper extends React.Component {
  
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            menuItems: [],
            user: "",
            authLevel: 0,
            identifier: "",
            error: false
        }
    }

    
    async componentDidMount() {
      var idProp = ""
      try {
        const response = await fetch('http://localhost:3000/api/users/access', {
          method: 'post',
          body: 'email=' + this.props.userName,
          headers: { 'Content-type': 'application/x-www-form-urlencoded' }
        })
        const data = await response.json();
        console.log("FETCHED DATA" + JSON.stringify(data.data[0]));
        switch (data.data[0].auth_level) {
          case 2:
            idProp = "country"
            break;
          case 3:
            idProp = "location"
        
          default:
            idProp = ""
            break;
        }
        this.setState({
          user: data.data[0].email,
          authLevel: data.data[0].auth_level,
          identifier: data.data[0].idProp
  
        });
        
      } catch (error) {
        console.log(error)
        this.setState({error: true, isLoading: false});
      }

      console.log("Identifier" + this.state.identifier);
   
        const newDen = {
            title: "Register new",
            route: "/newDen",
            icon: <AddIcon />
          };
        const editAccess = {
          title: "Edit access",
          route: "/access",
          icon: <LockIcon />
        }
        const users = {
          title: "Users",
          route: "/users",
          icon: <PeopleIcon />
        };
        const dens = {
          title: "Dens",
          route: "/dens",
          icon: <BusinessIcon />
        };
          
          const menuItems = [
            {
              title: "Home",
              route: "/",
              icon: <HomeIcon />
            }
          ];

        if (this.state.authLevel == 2 || this.state.authLevel == 1) {
          menuItems.push(editAccess);
          if (this.state.authLevel == 1) {
            menuItems.push(users);
            menuItems.push(newDen);
          };
          menuItems.push(dens);
        }

        this.setState({
          menuItems: menuItems,
          isLoading: false
        })

        
     
    }
    render() {

        if (this.state.isLoading == true) {
            return (
                <p>Loading...</p>
            )
        }
        else if (this.state.error) {
          return (
            <div></div>
          )
        }
      
      return (
        <MenuDrawer menuItems={this.state.menuItems}/>
      );
    }
  }


  