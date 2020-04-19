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

  const [signupSelected, setSignUpSelected] = React.useState(signup);
  
  function setSelectedStyles() {
    console.log(signup)
  }
  
  React.useEffect(() => {
    setSelectedStyles();
  }, [])

  const classes = useStyles();

  return (
    <List className={classes.list}>      
      <ListItem className={classes.listItem}>
        <Link
          to="/"
          color="transparent"
          className={classes.navLink}
        >
          <Dashboard className={classes.icons} /> Dashboard
        </Link>
      </ListItem>

      <ListItem className={classes.listItem}>
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
