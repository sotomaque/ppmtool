import React from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { Button, Typography } from "@material-ui/core";
import Launch from "@material-ui/icons/Launch";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Moment from "react-moment";

import { connect } from 'react-redux';
import { deleteProject } from '../../actions/projectActions';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ProjectItem = (props) => {
  const { project } = props;
  const classes = useStyles();

  const history = useHistory();

  function handleDelete(id) {
    props.deleteProject(id)
  }

  function showAlert(id) {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p>This Action Cannot be Undone</p>
            <Button variant="contained" color="primary" onClick={onClose}>
              No
            </Button>
            <Button
              className="float-right"
              variant="contained"
              color="secondary"
              onClick={
                () => {
                  handleDelete(id);
                  onClose();
                }
              }
            >
              Yes, Delete it!
            </Button>
          </div>
        );
      },
    });
  }

  function handleUpdateClicked(projectIdentifier) {
    history.push(`/editProject/${projectIdentifier}`);
  }

  return (
      <div className="card card-body bg-light mb-3">
          <div className="row" style={{justifyContent: 'center'}}>
            <div className="col-lg-2">
              <span>
                <Typography variant="subtitle1" color="textPrimary">
                  Project ID: {project.projectIdentifier}
                </Typography>
              </span>
            </div>
            <div className="col-lg-4 col-md-4 col-8">
              <Typography variant="h4" color="textPrimary">
                {project.projectName}
              </Typography>
              <Typography variant="subtitle1" color="textPrimary">
                {project.description}
              </Typography>
            </div>
            <div className="col-lg-2 d-none d-lg-block">
              {project.start_date !== null ? (
                <>
                  <p>Started on</p>
                  <span>
                    <Moment
                      format="dddd, MMMM Do YYYY"
                      date={project.start_date}
                      style={{ color: "blue" }}
                    />
                  </span>
                </>
              ) : (
                <span style={{ color: "blue", fontSize: "14px" }}>
                  Click <em>Update Project</em> to set a Start Date
                </span>
              )}
            </div>
            <div className="col-lg-2 d-none d-lg-block">
              {project.end_date !== null ? (
                <>
                  <p>Ends on</p>
                  <span>
                    <Moment
                      format="dddd, MMMM Do YYYY"
                      date={project.end_date}
                      style={{ color: "blue" }}
                    />
                  </span>
                </>
              ) : (
                <span style={{ color: "blue", fontSize: "14px" }}>
                  Click <em>Update Project</em> to set a End Date
                </span>
              )}
            </div>
            <div className="col-md-2">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<Launch />}
                onClick={() =>
                  history.push(`/projectBoard/${project.projectIdentifier}`)
                }
                fullWidth={true}
              >
                Launch
              </Button>
              <br />
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => showAlert(project.projectIdentifier)}
                fullWidth={true}
              >
                Delete
              </Button>
              <br />
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<Edit />}
                onClick={() => handleUpdateClicked(project.projectIdentifier)}
                fullWidth={true}
              >
                Edit
              </Button>
            </div>
          </div>
      </div>
  );
};



export default connect(null, { deleteProject })(ProjectItem);
