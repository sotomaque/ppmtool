import React from "react";
import { useParams, useHistory } from "react-router-dom";

import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import HeaderLinksLeft from "../../components/Header/HeaderLinksLeft.js";

// import Footer from "./components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Parallax from "../../components/Parallax/Parallax.js";
import ProjectBoard from "../../components/ProjectBoard/ProjectBoard.js";

import styles from "../../assets/js/landingPage.js";
import image from "../../assets/img/dashboard.jpg";
import { Typography, Button, CircularProgress } from "@material-ui/core";

import { connect } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';

const useStyles = makeStyles(styles);


const ProjectBoardPage = (props) => {
  const classes = useStyles();
  let { id } = useParams();   
  const history = useHistory();

  const [error, setError] = React.useState('');

  React.useEffect(() => {
    console.log('here')
    if (props.errors.projectIdentifier) {
      console.log('here2')
      setError(props.errors.projectIdentifier);
    } 
  }, [props])


  return (
    <div className="mb-4">
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
      />
      <Parallax filter image={image} small>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
            {
              !props.errors.projectIdentifier ? (
                <Typography variant="h2" align="center">Dashboard for Project: {id} </Typography>
              ) : (
                <Typography variant="h2" align="center">{error}</Typography>
              )
            }
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
         {
          !props.errors.projectIdentifier ? (
            <ProjectBoard />
          ) : (
            <div className="pt-4 mb-4">

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    size="large"
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => {
                      props.clearErrors()
                      history.push('/dashboard')}
                    }
                  >
                    Go Back to Dashboard
                  </Button>
                  <br />
                </div>

            </div>
          )
         }
          
        </div>
      </div>
     
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors
});

export default  connect(mapStateToProps, {clearErrors} )(ProjectBoardPage);