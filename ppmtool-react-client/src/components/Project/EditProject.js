import React, { useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/js/projectBoardStyle.js";
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';


import { connect } from 'react-redux';
import { getProjectById, createProject } from '../../actions/projectActions';

const useStyles = makeStyles(styles);

const EditProject = (props) => {
    const classes = useStyles();
    let { id } = useParams();
    const [pid, setPid] = React.useState('');
    const [projectName, setProjectName] = React.useState('');
    const [projectIdentifier, setProjectIdentifier] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [start_date, setStartDate] = React.useState('');
    const [end_date, setEndDate] = React.useState('');

    const [loading, setLoading] = React.useState(true);

    const [errorName, setErrorName] = React.useState('');
    const [errorId, setErrorId] = React.useState('');
    const [errorDescription, setErrorDescription] = React.useState("");
    
    const [refetch, setRefetch] = React.useState(true);

    let history = useHistory();

    useEffect(() => {
        console.log('hi')
        // fetching project details
        props.getProjectById(id);   
        console.log('this one too')
        if (!isEmpty(props.project) && refetch )  {
            setProjectAttributes(props.project); 
            console.log(props.project)
            if (props.project.id) {
                setRefetch(false);
                setLoading(false);
            }
        }

        // error handling 
        if (props.errors) {
            let errors = props.errors;
            setErrorMessages(errors);
        } else {
            setErrorName("");
            setErrorId("");
            setErrorDescription("");
        }
    
    }, [props]);

    function setErrorMessages(errorResponse) {
        if (errorResponse?.description) {
          setErrorDescription(errorResponse.description);
        } else {
          setErrorDescription("");
        }
        if (errorResponse?.projectName) {
          setErrorName(errorResponse.projectName);
        } else {
          setErrorName("");
        }
        if (errorResponse?.projectIdentifier) {
          setErrorId(errorResponse.projectIdentifier);
        } else {
          setErrorId("");
        }
    }

    const project = {
        id: pid, 
        projectName,
        projectIdentifier,
        description,
        start_date,
        end_date,
    };

    function handleSubmit(e) {
        e.preventDefault();   
        const projectClone = {...project}
        setPid('');
        setProjectName('');
        props.createProject(projectClone, history);
    }

    function setProjectAttributes(projectFromDb) {
        setPid(projectFromDb.id)
        setProjectName(projectFromDb.projectName);
        setProjectIdentifier(projectFromDb.projectIdentifier);
        setDescription(projectFromDb.description);
        if (projectFromDb.end_date) {
            setEndDate(projectFromDb.end_date)
        }
        if (projectFromDb.start_date) {
            setStartDate(projectFromDb.start_date);
        }
    }

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    
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

const mapStateToProps = (state) => ({
    project: state.project.project,
    errors: state.errors
})

export default connect(mapStateToProps, {getProjectById, createProject})(EditProject);