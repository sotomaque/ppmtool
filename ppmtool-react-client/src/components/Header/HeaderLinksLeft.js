import React from "react";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Dashboard } from "@material-ui/icons";

import styles from "../../assets/js/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinksLeft(props) {
  
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
    </List>
  );
}
