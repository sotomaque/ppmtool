import React, { useContext, useEffect } from "react";

import ProjectContext from '../../context/ProjectContext';

import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";

import styles from "../../assets/js/projectBoardStyle.js";
import { CircularProgress, Typography } from "@material-ui/core";
import CreateProjectTaskButton from "./CreateProjectTaskButton.js";

const useStyles = makeStyles(styles);

const ProjectBoard = () => {
    const classes = useStyles();

    const { id } = useParams();   

    const projectContext = useContext(ProjectContext);
    const { selectedProject, backlog, getProjectById, getBacklogForProject, loading } = projectContext;

    const [error, setError] = React.useState('');


    useEffect(() => {
        getProjectById(id);
        getBacklogForProject(id);
    }, [])

    console.log('selected project: ', selectedProject);
    console.log('backlog for project: ', backlog)

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
        <div className={classes.section}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <Typography variant="h3" color="textPrimary" align="center">{selectedProject.projectName}</Typography>
                    <Typography variant="h4" color="textPrimary" align="center">{selectedProject.description}</Typography>
                </GridItem>
            </GridContainer>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <CreateProjectTaskButton />
            </div>
            <hr />
            <br/>
            <div className="row">
                {/* TODO */}
                <div className="col-md-4">
                    <div className="card text-center mb-2">
                        <div className="card-header bg-secondary text-white">
                            <h3>TO DO</h3>
                        </div>
                    </div>
                    <div className="card mb-1 bg-light">
                        <div className="card-header text-primary">
                            ID: projectSequence -- Priority: priorityString
                        </div>
                        <div className="card-body bg-light">
                            <h5 className="card-title">project_task.summary</h5>
                            <p className="card-text text-truncate ">
                                project_task.acceptanceCriteria
                            </p>
                            <a href="" className="btn btn-primary">
                                View / Update
                            </a>
                            <button className="btn btn-danger ml-4">Delete</button>
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
        </div>
        
    );
};

export default ProjectBoard;
