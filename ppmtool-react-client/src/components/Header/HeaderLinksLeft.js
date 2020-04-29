import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Dashboard } from "@material-ui/icons";

import styles from "../../assets/js/headerLinksStyle.js";

import { connect } from 'react-redux';

const useStyles = makeStyles(styles);

const HeaderLinksLeft = (props) => {
  const classes = useStyles();
  const { validToken, user } = props?.security;

  if (validToken && user) {
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
    )
  } else {
    return (
      <></>
    )
  }
}

const mapStateToProps = (state) => ({
  security: state.security
})

export default connect(mapStateToProps, {})(HeaderLinksLeft);
