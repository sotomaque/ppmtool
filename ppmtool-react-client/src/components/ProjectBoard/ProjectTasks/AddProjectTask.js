import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { Typography, Button, CircularProgress } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import styles from "../../../assets/js/projectBoardStyle.js";

import { connect } from 'react-redux';
import { createProjectTask } from '../../../actions/backlogActions';


const useStyles = makeStyles(styles);

const AddProjectTask = (props) => {
  const classes = useStyles();
  let { id } = useParams();

  const [summary, setSummary] = React.useState("");
  const [errorSummary, setErrorSummary] = React.useState("");

  const [acceptanceCriteria, setAcceptanceCriteria] = React.useState("");
  const [errorAcceptanceCriteria, setErrorAcceptanceCriteria] = React.useState("");

  const [status, setStatus] = React.useState("");

  const [priority, setPriority] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");

  let history = useHistory();

  const projectTask = {
    summary,
    acceptanceCriteria,
    status,
    priority,
    dueDate,
  };

  React.useEffect(() => {
    console.log('in here')
  }, [props])

  function handleSubmit(e) {
    e.preventDefault();
    props.createProjectTask(id, projectTask, history);
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
            onClick={() => history.goBack()}
          >
            Go Back to Project Board
          </Button>
        </div>
        <hr />
        <br />
        <div className="row">
          <div className="col-md-8 m-auto">
            <Typography variant="h3" color="textPrimary">
              Enter Task Information
            </Typography>
            <hr />
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                className="form-control form-control-lg"
                required
                error={errorSummary ? true : false}
                helperText={errorSummary}
                variant="outlined"
                multiline
                id="standard-basic"
                label="Task Summary"
                name="summary"
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
              />
              <br />
              <br />
              <br />

              <TextField
                className="form-control form-control-lg"
                error={errorAcceptanceCriteria ? true : false}
                helperText={errorAcceptanceCriteria}
                variant="outlined"
                id="standard-basic"
                label="Acceptance Criteria"
                name="acceptanceCriteria"
                value={acceptanceCriteria}
                onChange={(event) => setAcceptanceCriteria(event.target.value)}
              />

              <br />
              <br />
              <br />

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="priority"
                  onChange={(event) => setPriority(event.target.value)}
                  value={priority}
                >
                  <option value={0}>Select Priority</option>
                  <option value={1}>High</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Low</option>
                </select>
              </div>

              <br />

              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="status"
                  onChange={(event) => setStatus(event.target.value)}
                  value={status}
                >
                  <option value="">Select Status</option>
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="DONE">DONE</option>
                </select>
              </div>

              <br />

              <Typography variant="h6" color="textPrimary">
                Due Date
              </Typography>
              <div className="form-group">
                <input
                  type="date"
                  className="form-control form-control-lg"
                  name="dueDate"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
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

})


export default connect( null, {createProjectTask} )(AddProjectTask);
