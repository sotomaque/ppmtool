import React from 'react'
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

import { confirmAlert } from 'react-confirm-alert';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const ProjectTask = ({ task }) => {
    const classes = useStyles();

    function showAlert(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
            return (
                <div className='custom-ui'>
                <h1>Are you sure?</h1>
                <p>This Action Cannot be Undone</p>
                <Button variant="contained" color="primary"  onClick={onClose}>
                    No
                </Button>
                <Button className="float-right" variant="contained" color="secondary" onClick={() => {
                    onClose();
                }}>
                    Yes, Delete it!
                </Button>
                </div>
            );
            }
        })
    }

    
    return (
        <div className="card mb-1 bg-light">
            <div className="card-header">
                <Typography variant="h4" color="textPrimary">ID: {task.projectSequence}</Typography>
            </div>
            <div className="card-body bg-light">
                <Typography variant="body1" color="textPrimary">{task.summary}</Typography>
                {
                    task.acceptanceCriteria && (
                        <span className="card-text text-truncate ">
                            <Typography variant="body2" color="textPrimary">{task.acceptanceCriteria}</Typography>
                        </span>
                    )
                }
                <a href="" className="btn btn-primary">
                    View / Update
                </a>
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
    )
}

export default ProjectTask;
