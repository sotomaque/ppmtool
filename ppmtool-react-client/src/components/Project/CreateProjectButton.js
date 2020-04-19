import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const CreateProjectButton = () => {
    const classes = useStyles();
    let history = useHistory();

    function handleAddClicked() {
        history.push('/addProject')
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
        Add Project
        </Button>  
    )
}

export default CreateProjectButton;