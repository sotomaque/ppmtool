import React from "react";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Dashboard, PersonAdd, Input } from "@material-ui/icons";

import styles from "../../assets/js/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  
  const {signup} = props;
  const login = props?.login;

  const [signupSelected, setSignUpSelected] = React.useState(signup);
  const [loginSelected, setLoginSelected] = React.useState(login);

  
  function setSelectedStyles() {
    // console.log(login)
  }
  
  React.useEffect(() => {
    setSelectedStyles();
  }, [])

  const classes = useStyles();

  return (
    <List className={classes.list}>      
      <ListItem className={classes.listItem}>
        <Link
          to="/dashboard"
          color="transparent"
          className={classes.navLink}
        >
          <Dashboard className={classes.icons} /> Dashboard
        </Link>
      </ListItem>

      <ListItem className={classes.listItem + ' ' + `${loginSelected ? classes.active : ""}`}>
        <Link
          to="/login"
          color="transparent"
          className={classes.navLink}
        >
          <Input className={classes.icons} /> Login
        </Link>
      </ListItem>

      <ListItem className={classes.listItem + ' ' + `${signupSelected ? classes.active : ""}`}>
        <Link
          to="/signup"
          color="transparent"
          className={classes.navLink}
        >
          <PersonAdd className={classes.icons} /> Sign Up
        </Link>
      </ListItem>
     
     
     
    </List>
  );
}
