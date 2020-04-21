import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/js/projectBoardStyle.js";
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';

const useStyles = makeStyles(styles);

const EditProject = () => {
    const classes = useStyles();
    let { id } = useParams();
    const [pid, setPid] = React.useState('');
    const [projectName, setProjectName] = React.useState('');
    const [projectIdentifier, setProjectIdentifier] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [start_date, setStartDate] = React.useState('');
    const [end_date, setEndDate] = React.useState('');

    const [loading, setLoading] = React.useState(false);
    const [errorName, setErrorName] = React.useState('');
    const [errorDescription, setErrorDescription] = React.useState('');
    const [errorId, setErrorId] = React.useState('');
    
    let history = useHistory();

    const project = {
        id: pid,
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
            // show modal saying project was successfully added
            // click anywhere to close and go back to dashboard
            history.push('/dashboard');
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

    async function handleSubmit(e) {
        e.preventDefault();

        // pre-process 
        // check if anything has changed
        // if not avoid post method call
 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(project)
        };

        setLoading(true);

        await fetch('http://www.localhost:8080/api/project', requestOptions)
            .then(response => response.json())
            .then(data => checkForErrors(data))
        .catch((error) => console.error('Error: ', error))
        .finally(() => setLoading(false));
    }

    function setProjectValues(response) {
        console.log(response)
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

    async function getProjectDetails() {
        setLoading(true);
        await fetch(`http://www.localhost:8080/api/project/${id}`)
            .then(res => res.json())
            .then(data => setProjectValues(data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }

    useEffect(() => {
        getProjectDetails();
    }, []);

    
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
        <div className="pt-4 mb-4">
            <div className={classes.section}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        size="large"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={() => history.goBack()}
                    >
                        Go Back to Dashboard
                    </Button>
                </div>
                <hr />
                <br />
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Typography variant="h3" color="textPrimary">
                        Enter Project Information
                        </Typography>
                        <hr />
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                className="form-control form-control-lg"
                                required
                                error={errorName ? true : false}
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
                                required
                                error={errorId ? true : false}
                                helperText={errorId}
                                variant="outlined"
                                id="standard-basic"
                                label="Unique Project ID"
                                disabled
                                name="projectIdentifier"
                                value={projectIdentifier}
                                onChange={(event) => setProjectIdentifier(event.target.value)}
                            />
                            <br />
                            <br />
                            <br />
                            <TextField
                                className="form-control form-control-lg"
                                required
                                error={errorDescription ? true : false}
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
                            <Typography variant="h6" color="textPrimary">
                                Start Date
                            </Typography>
                            <div className="form-group">
                                <input
                                type="date"
                                className="form-control form-control-lg"
                                name="start_date"
                                value={start_date}
                                onChange={(event) => setStartDate(event.target.value)}
                                />
                            </div>
                            <Typography variant="h6" color="textPrimary">
                                Estimated End Date
                            </Typography>
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
                            <Button
                                variant="contained"
                                fullWidth={true}
                                color="secondary"
                                type="submit"
                                onClick={(event) => handleSubmit(event)}
                            >
                                Update
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProject;