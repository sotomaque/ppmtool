import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../../assets/js/projectBoardStyle.js";
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';


import { connect } from 'react-redux';
import { getTaskById, updateTask } from '../../../actions/backlogActions';

const useStyles = makeStyles(styles);

const EditProjectTask = (props) => {
    const classes = useStyles();

    const { id } = useParams();
    const { task_id } = useParams();

    const history = useHistory();

    const [tId, setTid] = React.useState('');
    const [projectSequence, setProjectSequence] = React.useState('');
    const [projectIdentifier, setProjectIdentifier] = React.useState('');
    const [summary, setSummary] = React.useState('');
    const [acceptanceCriteria, setAcceptanceCriteria] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [dueDate, setDueDate] = React.useState('');

    const [loading, setLoading] = React.useState(true);
    const [refetch, setRefetch] = React.useState(true);

    useEffect(() => {
        props.getTaskById(id, task_id);
        if (!isEmpty(props.project_task) && refetch) {
            setRefetch(false);
            setTaskAttributes(props.project_task);
            setLoading(false);
        }
    }, [props.project_task]);

    function setTaskAttributes(taskFromDb) {
        setTid(taskFromDb.id);
        setProjectSequence(taskFromDb.projectSequence);
        setProjectIdentifier(taskFromDb.projectIdentifier);
        setSummary(taskFromDb.summary);
        setStatus(taskFromDb.status)

        if (taskFromDb.acceptanceCriteria) {
            setAcceptanceCriteria(taskFromDb.acceptanceCriteria)
        }

        if (taskFromDb.priority) {
            setPriority(taskFromDb.priority)
        }

        if (taskFromDb.dueDate) {
            setDueDate(taskFromDb.dueDate)
        }
    }


    const task = {
        id: tId,
        projectSequence,
        projectIdentifier,
        summary, 
        acceptanceCriteria,
        status,
        priority,
        dueDate
    };

    function handleSubmit(e) {
        e.preventDefault();   
        const taskClone = {...task}
        setTid('');
        setSummary('');
        props.updateTask(id, task_id, taskClone, history);
    }

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 50
            }}>
                <CircularProgress />
            </div>
        );
    } 

    return (
        <div className="pt-4 mb-4">
            <div className={classes.section}>
            {/* BACK BUTTON */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => history.goBack()}
                    >
                        Go Back to Dashboard
                    </Button>
                </div>
                <hr />
                <br />
                <div className="row">
                    <div className="col-md-8 m-auto">
                        {/* SECTION TITLE */}
                        <Typography variant="h3" color="textPrimary">
                        Enter Task Information
                        </Typography>
                        <hr />
                        {/* FORM */}
                        <form className={classes.root} noValidate autoComplete="off">
              <TextField
                className="form-control form-control-lg"
                required
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
    )
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    project_task: state.backlog.project_task
})

export default connect(mapStateToProps, {getTaskById, updateTask})(EditProjectTask);