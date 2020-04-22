import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from 'react-redux';
import { createProject } from '../../actions/projectActions';

import styles from "../../assets/js/projectBoardStyle.js";
import { Typography, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(styles);

const AddProject = (props) => {
  const classes = useStyles();
  const [projectName, setProjectName] = React.useState("");
  const [projectIdentifier, setProjectIdentifier] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [start_date, setStartDate] = React.useState("");
  const [end_date, setEndDate] = React.useState("");

  const [errorName, setErrorName] = React.useState('');
  const [errorId, setErrorId] = React.useState('');
  const [errorDescription, setErrorDescription] = React.useState("");

  let history = useHistory();

  const project = {
    projectName,
    projectIdentifier,
    description,
    start_date,
    end_date,
  };

  React.useEffect(() => {
    if (props.errors) {
      let errors = props.errors;
      setErrorMessages(errors)
    } else {
      setErrorName("");
      setErrorId("");
      setErrorDescription("");
    }
  }, [props])

  function setErrorMessages(errorResponse) {
    if (errorResponse?.description) {
      setErrorDescription(errorResponse.description);
    } else {
      setErrorDescription("");
    }
    if (errorResponse?.projectName) {
      setErrorName(errorResponse.projectName);
    } else {
      setErrorName("");
    }
    if (errorResponse?.projectIdentifier) {
      setErrorId(errorResponse.projectIdentifier);
    } else {
      setErrorId("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.createProject(project, history);
  }


  return (
    <div className="pt-4 mb-4">
      <div className={classes.section}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => {
              history.goBack();
            }}
          >
            Go Back to Dashboard
          </Button>
        </div>
        <hr />
        <br />
        <div className="row">
          <div className="col-md-8 m-auto">
            <Typography variant="h3" color="textPrimary">
              Enter Project Information
            </Typography>
            <hr />
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                className="form-control form-control-lg"
                required
                error={errorName ? true : false}
                helperText={errorName}
                variant="outlined"
                id="standard-basic"
                label="Project Name"
                name="projectName"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
              />
              <br />
              <br />
              <br />
              <TextField
                className="form-control form-control-lg"
                required
                error={errorId ? true : false}
                helperText={errorId}
                variant="outlined"
                id="standard-basic"
                label="Unique Project ID"
                name="projectIdentifier"
                value={projectIdentifier}
                onChange={(event) => setProjectIdentifier(event.target.value)}
              />
              <br />
              <br />
              <br />
              <TextField
                className="form-control form-control-lg"
                required
                error={errorDescription ? true : false}
                helperText={errorDescription}
                variant="outlined"
                multiline
                id="standard-basic"
                label="Project Description"
                name="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
              <br />
              <br />
              <br />
              <Typography variant="h6" color="textPrimary">
                Start Date
              </Typography>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="start_date"
                  value={start_date}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>
              <Typography variant="h6" color="textPrimary">
                Estimated End Date
              </Typography>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="end_date"
                  value={end_date}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>
              <br />
              <br />
              <Button
                variant="contained"
                fullWidth={true}
                color="secondary"
                type="submit"
                onClick={(event) => handleSubmit(event)}
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


const mapStateToProps = (state) => ({
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { createProject }
)(AddProject);