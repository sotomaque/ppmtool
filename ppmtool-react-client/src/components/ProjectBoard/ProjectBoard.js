import React from "react";

import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Backlog from './Backlog';
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";

import styles from "../../assets/js/projectBoardStyle.js";
import { Typography, Button } from "@material-ui/core";
import CreateProjectTaskButton from "./CreateProjectTaskButton.js";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { connect } from 'react-redux';
import { getBacklog } from '../../actions/backlogActions';
import { getProjectById } from '../../actions/projectActions';

const useStyles = makeStyles(styles);

const ProjectBoard = (props) => {
    const classes = useStyles();
    const location = useLocation();
    const { id } = useParams();

    const [showSuccessAddedAlert, setShowSuccessAddedAlert] = React.useState(false);

    function showSuccessAdded() {
        if (location.showSuccessAlert) {
          setShowSuccessAddedAlert(true);
        } 
    }

    React.useEffect(() => {
        // showSuccessAdded();
        props.getBacklog(id);
        props.getProjectById(id);
    }, []);

    const backlog = props.backlog.project_tasks;
    const project = props.project.project;

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
                    <Typography variant="h3" color="textPrimary" align="center">{project.projectName}</Typography>
                    <Typography variant="h4" color="textPrimary" align="center">{project.description}</Typography>
                </GridItem>
            </GridContainer>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <CreateProjectTaskButton />
            </div>
            <hr />
            <br/>
            {
                <Backlog backlog={backlog} />
            }
        </div>  
    );
};

const mapStateToProps = (state) => ({
  backlog: state.backlog,
  project: state.project,
  errors: state.errors
});

export default connect(mapStateToProps, { getBacklog, getProjectById })(ProjectBoard);
