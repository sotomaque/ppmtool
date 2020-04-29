import React from "react";
import { Link, useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { PersonAdd, Input } from "@material-ui/icons";

import styles from "../../assets/js/headerLinksStyle.js";

import { connect } from 'react-redux';
import { logout } from '../../actions/securityActions';
import { Button } from "@material-ui/core";

const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const { validToken, user } = props?.security;

  const handleLogout = () => {
    props.logout();
    history.push('/login');
  }

  function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  } 

  if (validToken && !isEmpty(user)) {
    return (
      <List className={classes.list}>      
        <ListItem className={classes.listItem}>
          <Button
            style={{color: 'white'}}
            onClick={handleLogout}
            className={classes.navLink}
          >
            <Input className={classes.icons} /> Log Out
          </Button>
        </ListItem>
      </List>
    )
  } else {
    return (
      <List className={classes.list}>      
        <ListItem className={classes.listItem}>
          <Link
            to="/login"
            color="transparent"
            className={classes.navLink}
          >
            <Input className={classes.icons} /> Login
          </Link>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link
            to="/signup"
            color="transparent"
            className={classes.navLink}
          >
            <PersonAdd className={classes.icons} /> Sign Up
          </Link>
        </ListItem>  
      </List>
    )
  }

}

const mapStateToProps = (state) => ({
  security: state.security
})

export default connect(mapStateToProps, { logout })(HeaderLinks);