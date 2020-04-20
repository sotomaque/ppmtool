import React, { useContext, useEffect } from "react";

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
    let { id } = useParams();   

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const [pid, setPid] = React.useState('');
    const [projectName, setProjectName] = React.useState('');
    const [projectIdentifier, setProjectIdentifier] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [start_date, setStartDate] = React.useState('');
    const [end_date, setEndDate] = React.useState('');


    function setProjectValues(response) {
        // required fields
        setPid(response.id);
        setProjectName(response.projectName);
        setProjectIdentifier(response.projectIdentifier);
        setDescription(response.description);

        // optional fields
        if (response.start_date) {
            setStartDate(response.start_date);
        }
        if (response.end_date) {
            setEndDate(response.end_date);
        }
    }

    const getProjectDetails = async() => {
        setLoading(true);
        await fetch(`http://www.localhost:8080/api/project/${id}`)
            .then(res => res.json())
            .then(data => setProjectValues(data))
        .catch((error) => {
            setError(error);
            setLoading(false);
            console.error(error)
        });
    }

    const getBackloadForProject = async() => {
        await fetch(`http://www.localhost:8080/api/backlog/${id}`)
            .then(res => res.json())
            .then(data => console.dir(data))
            .then(() => setLoading(false))
        .catch((error) => {
            setError(error);
            setLoading(false);
            console.error(error)
        });
    }

    useEffect(() => {
        getProjectDetails();
        getBackloadForProject();
    }, [])

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
                    <Typography variant="h2" color="textPrimary" align="center">{projectName}</Typography>
                    <Typography variant="body" color="textPrimary" align="center">{description}</Typography>
                </GridItem>
            </GridContainer>
            <br/>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <CreateProjectTaskButton />
            </div>
            <hr />
            <br/>
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
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
           
                    </GridItem>
                </GridContainer>
            </div>
        </div>
        
    );
};

export default ProjectBoard;
