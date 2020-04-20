import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const CreateProjectTaskButton = () => {
    const classes = useStyles();
    let history = useHistory();
    let { id } = useParams();   


    function handleAddClicked() {
        history.push(`/addProjectTask/${id}`)
    }

    return (
        <Button
            size="large"
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<Add />}
            onClick={()=> handleAddClicked()}
        >
        Add Project Task
        </Button>  
    )
}

export default CreateProjectTaskButton;