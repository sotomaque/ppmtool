import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import Edit from "@material-ui/icons/Edit";
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
}));

const ProjectTask = ({ task }) => {
    const classes = useStyles();

    return (
    <>
        <div className="card mb-1 bg-light">
            <div className="card-header">
                <Typography variant="body1" color="textPrimary">ID: {task.projectSequence}</Typography>
            </div>
            <div className="card-body bg-light">
                {/* SUMMARY */}
                <div>
                    <Typography variant="subtitle1" color="textPrimary">SUMMARY:</Typography>
                    <Typography variant="subtitle1" color="textPrimary">{task.summary}</Typography>
                </div>
                {/* ACCEPTANCE CRITERIA */}
                {
                    
                    task.acceptanceCriteria && (
                        <>
                            <hr />
                            <span className="card-text text-truncate ">
                                <Typography variant="subtitle1" color="textPrimary">ACCEPTANCE CRITERIA:</Typography>
                                <Typography variant="body2" color="textPrimary">{task.acceptanceCriteria}</Typography>
                            </span>
                        </>
                    )
                }
                {/* PRIORITY */}
                {
                    task.priority && (
                        <>
                            <hr />
                            <span className="card-text text-truncate ">
                                <Typography variant="body2" color="textPrimary">PRIORITY: {task.priority}</Typography>
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
                                <Typography variant="body2" color="textPrimary">DUE:</Typography>
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
                    onClick={() => console.log('clicked')}
                    >
                    Delete
                </Button> 
            </div>
        </div>
        <br />
    </>
    )
}


export default ProjectTask;