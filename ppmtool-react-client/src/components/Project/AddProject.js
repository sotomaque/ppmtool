import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/js/projectBoardStyle.js";
import { Typography, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(styles);

const AddProject = () => {
    const classes = useStyles();
    const [projectName, setProjectName] = React.useState('');
    const [projectIdentifier, setProjectIdentifier] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [start_date, setStartDate] = React.useState('');
    const [end_date, setEndDate] = React.useState('');

    const [errorName, setErrorName] = React.useState('');
    const [errorDescription, setErrorDescription] = React.useState('');
    const [errorId, setErrorId] = React.useState('');

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
    
    let history = useHistory();

    const project = {
        projectName,
        projectIdentifier,
        description,
        start_date,
        end_date
    }

    function checkForErrors(response) {
        if (response.id) {
            setErrorDescription('');
            setErrorName('');
            setErrorId('');
            history.push({
                pathname: '/dashboard',
                showSuccessAlert: true
            });
        } else {
            console.error('error postiting project ', response);

            if (response.description) {
                setErrorDescription(response.description);
            } else {
                setErrorDescription('');
            }

            if (response.projectName) {
                setErrorName(response.projectName);
            } else {
                setErrorName('');
            }

            if (response.projectIdentifier) {
                setErrorId(response.projectIdentifier);
            } else {
                setErrorId('');
            }
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        };
        
        fetch('http://www.localhost:8080/api/project', requestOptions)
            .then(response => response.json())
            .then(data =>{ checkForErrors(data); console.dir(data) })
        .catch((error) => console.error('Error: ', error));
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className={classes.section}>
            <div className="row">
                <div className="col-md-8 m-auto">
                    <Typography variant="h3" color="textPrimary">Enter Project Information</Typography>
                    <hr />
           
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField 
                            className="form-control form-control-lg" 
                            error={errorName}
                            helperText={errorName}
                            variant="outlined"
                            id="standard-basic" 
                            label="Project Name" 
                            name="projectName"
                            value={projectName}
                            onChange={(event) => setProjectName(event.target.value)}
                        />
                        <br />
                        <br />
                        <br />
                        <TextField 
                            className="form-control form-control-lg" 
                            error={errorId}
                            helperText={errorId}
                            variant="outlined"
                            id="standard-basic" 
                            label="Unique Project ID" 
                            name="projectIdentifier"
                            value={projectIdentifier}
                            onChange={(event) => setProjectIdentifier(event.target.value)} 
                        />
                        <br />
                        <br />
                        <br />
                        <TextField 
                            className="form-control form-control-lg" 
                            error={errorDescription}
                            helperText={errorDescription}
                            variant="outlined"
                            multiline
                            id="standard-basic" 
                            label="Project Description" 
                            name="description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <br />
                        <br />
                        <br />
                        <Typography variant="h6" color="textPrimary">Start Date</Typography>
                        <div className="form-group">
                            <input 
                                type="date" 
                                className="form-control form-control-lg" 
                                name="start_date" 
                                value={start_date}
                                onChange={(event) => setStartDate(event.target.value)} 
                            />
                        </div>
                        <Typography variant="h6" color="textPrimary">Estimated End Date</Typography>
                        <div className="form-group">
                            <input 
                                type="date" 
                                className="form-control form-control-lg" 
                                name="end_date" 
                                value={end_date}
                                onChange={(event) => setEndDate(event.target.value)} 
                            />
                        </div>
                        
                        <br />
                        <br />

                        <Button variant="contained" fullWidth={true} color="secondary" type="submit" onClick={(event) => handleSubmit(event)}>
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddProject;