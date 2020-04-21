import React, { useContext, useEffect } from "react";

import ProjectContext from '../../context/ProjectContext';

import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Backlog from './Backlog';
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

    useEffect(() => {
        getProjectById(id);
        getBacklogForProject(id);
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
            {
                backlog && <Backlog />
            }
            
        </div>
        
    );
};

export default ProjectBoard;
