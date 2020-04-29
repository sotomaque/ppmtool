import React from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import HeaderLinksLeft from "../../components/Header/HeaderLinksLeft.js";
import Parallax from "../../components/Parallax/Parallax.js";
// import Footer from "./components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";

import styles from "../../assets/js/landingPage.js";

import image from "../../assets/img/dashboard.jpg";
import Dashboard from "../../components/Dashboard.js";
import { Typography } from "@material-ui/core";

import { connect } from 'react-redux';


const useStyles = makeStyles(styles);

function DashboardPage(props) {
  const classes = useStyles();
  const history = useHistory();
  const { ...rest } = props;

  React.useEffect(() => {
    // prevent showing login page if logged in
    if (!props?.security?.validToken) {
        history.push('/login')
    }
  }, [])

  return (
    <div>
      <Header
        color="transparent"
        brand="Personal Project Management"
        leftLinks={<HeaderLinksLeft />}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "dark"
        }}
        {...rest}
      />
      <Parallax filter image={image} small>
        <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <Typography variant="h2" align="center">Project Dashboard</Typography>
          </GridItem>
        </GridContainer>
      </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  security: state.security
});

export default connect(mapStateToProps, {})(DashboardPage);