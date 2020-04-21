import React from "react";
import { useParams } from "react-router-dom";

import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "../../components/Header/Header.js";
// import Footer from "./components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Parallax from "../../components/Parallax/Parallax.js";
import AddProject from "../../components/Project/AddProject.js";

import styles from "../../assets/js/landingPage.js";

import image from "../../assets/img/dashboard.jpg";
import HeaderLinksLeft from "../../components/Header/HeaderLinksLeft.js";
import { Typography } from "@material-ui/core";


const useStyles = makeStyles(styles);

const AddProjectPage = (props) => {
  const classes = useStyles();
  const { id } = useParams();   
  const { ...rest } = props;
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
              <Typography variant="h2" align="center">Create a New Task for Project: {id} </Typography>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <AddProject />
        </div>
      </div>
    </div>
  );
}

export default AddProjectPage;