import React from 'react';

import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from "@material-ui/icons/Edit";

import Moment from 'react-moment';

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { connect } from 'react-redux';
import { deleteProjectTask } from '../../../actions/backlogActions';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

const ProjectTask = (props) => {

    const { task } = props;

    const classes = useStyles();
    const { id } = useParams();

    let priorityString;
    let priorityClass;

    if (task.priority === 1) {
        priorityClass = "bg-danger";
        priorityString = "HIGH"
    } else if (task.priority === 2) {
        priorityClass = "bg-warning";
        priorityString = "MEDIUM"
    } else {
        priorityClass = "bg-info";
        priorityString = "LOW"
    }

    function handleDelete(id, projectSequence) {
        props.deleteProjectTask(id, projectSequence)
    }

    function showAlert(projectSequence) {
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
                      handleDelete(id, projectSequence);
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

    return (
    <>
        <div className="card mb-1 bg-light">
            {/* ID and PRIORITY */}
            <div className={`card-header ${priorityClass}`}>
                <Typography variant="h6" color="textPrimary">ID: {task.projectSequence}</Typography>
                {' '}
                <Typography variant="caption" color="textPrimary">PRIORITY: {priorityString}</Typography>
            </div>
            <div className="card-body bg-light">
                {/* SUMMARY */}
                <div >
                    <Typography variant="h6" color="textPrimary">SUMMARY:</Typography>
                    <Typography variant="body2" color="textPrimary">{task.summary}</Typography>
                </div>
                {/* ACCEPTANCE CRITERIA */}
                {
                    task.acceptanceCriteria && (
                        <>
                            <hr />
                            <span className="card-text text-truncate ">
                                <Typography variant="h6" color="textPrimary">ACCEPTANCE CRITERIA:</Typography>
                                <Typography variant="body2" color="textPrimary">{task.acceptanceCriteria}</Typography>
                            </span>
                        </>
                    )
                }
                {/* DUE DATE */}
                {

                    task.dueDate && (
                        <>
                            <hr />
                            <span className="card-text text-truncate">
                                <Typography variant="h6" color="textPrimary">DUE:</Typography>
                                <Moment
                                    format="MM/DD/YYYY"
                                    date={task.due_date}
                                    style={{ color: "black" }}
                                />
                                
                                
                            </span>
                        </>
                    )
                }
            </div>
            {/* TASK ACTIONS */}
            <div className="card-footer">
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<Edit />}
                    onClick={() => console.log('update clicked')}
                    
                >
                    Edit
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={() => showAlert(task.projectSequence)}
                    >
                    Delete
                </Button> 
            </div>
        </div>
        <br />
    </>
    )
}


export default connect(null, { deleteProjectTask })(ProjectTask);