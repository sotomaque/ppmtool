import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

const Backlog = () => {
    const classes = useStyles();

    return (
        <div className="row">
        {/* TODO */}
        <div className="col-md-4">
            <div className="card text-center mb-2">
                <div className="card-header bg-secondary text-white">
                    <h3>TO DO</h3>
                </div>
                <div className="card mb-1 bg-light">
                    <div className="card-header">
                        <Typography variant="body1" color="textPrimary">ID: task.projectSequence</Typography>
                    </div>
                    <div className="card-body bg-light">
                        <div>
                            <Typography variant="caption" color="textPrimary">task.summary</Typography>
                        </div>
                        <br />
                        {/** 
                            task.acceptanceCriteria && (
                                <span className="card-text text-truncate ">
                                    <Typography variant="body2" color="textPrimary">task.acceptanceCriteria</Typography>
                                </span>
                            )
                         */}
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
                            onClick={() => console.log('clicked')}
                            >
                            Delete
                        </Button> 
                    </div>
                </div>
            </div>
        </div>

        {/* In Progress  */}
        <div className="col-md-4">
            <div className="card text-center mb-2">
                <div className="card-header bg-primary text-white">
                    <h3>In Progress</h3>
                </div>
            </div>
            {
            //  <!-- SAMPLE PROJECT TASK STARTS HERE -->
            //         <!-- SAMPLE PROJECT TASK ENDS HERE -->
            }
        </div>

        {/*  Done  */}
        <div className="col-md-4">
            <div className="card text-center mb-2">
            <div className="card-header bg-success text-white">
                <h3>Done</h3>
            </div>
            </div>
        </div>
    </div>
    )
}

export default Backlog;