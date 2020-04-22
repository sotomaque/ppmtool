import React from "react";

import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Backlog from './Backlog';
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";

import styles from "../../assets/js/projectBoardStyle.js";
import { Typography, Button } from "@material-ui/core";
import CreateProjectTaskButton from "./CreateProjectTaskButton.js";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const useStyles = makeStyles(styles);

const ProjectBoard = () => {
    const classes = useStyles();
    const location = useLocation();

    const [showSuccessAddedAlert, setShowSuccessAddedAlert] = React.useState(false);

    function showSuccessAdded() {
        if (location.showSuccessAlert) {
          setShowSuccessAddedAlert(true);
        } 
    }

    React.useEffect(() => {
        showSuccessAdded();
      }, [location]);

    function showAlert() {
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h1>Success!</h1>
                <p>The Task Has Been Successfully Added</p>
                <Button className="float-center" variant="contained" color="secondary" onClick={() => {
                  setShowSuccessAddedAlert(false);
                  onClose();
                }}>
                  Ok
                </Button>
              </div>
            );
          }
        })
      }

    if (showSuccessAddedAlert) {
        showAlert();
    }
    
    return (
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <Typography variant="h3" color="textPrimary" align="center">selectedProject.projectName</Typography>
                    <Typography variant="h4" color="textPrimary" align="center">selectedProject.description</Typography>
                </GridItem>
            </GridContainer>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <CreateProjectTaskButton />
            </div>
            <hr />
            <br/>
            {
                <Backlog />
            }
            
        </div>
        
    );
};

export default ProjectBoard;
