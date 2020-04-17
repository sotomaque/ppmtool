import React from 'react';
import { useHistory } from "react-router-dom";

const AddProject = () => {
    const [projectName, setProjectName] = React.useState('');
    const [projectIdentifier, setProjectIdentifier] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [start_date, setStartDate] = React.useState('');
    const [end_date, setEndDate] = React.useState('');



    const [errorName, setErrorName] = React.useState('');
    const [errorDescription, setErrorDescription] = React.useState('');
    const [errorId, setErrorId] = React.useState('');
    
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

            history.push('/');
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
            .then(data => checkForErrors(data))
        .catch((error) => console.error('Error: ', error));
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create a New Project</h5>
                        <hr />
                        <form>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg " 
                                    placeholder="Project Name" 
                                    name="projectName"
                                    value={projectName}
                                    onChange={(event) => setProjectName(event.target.value)}
                                />
                                {
                                    errorName && (
                                        <label style={{color: 'red'}}>{errorName}</label>
                                    )
                                }
                            </div>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    placeholder="Unique Project ID"
                                    name="projectIdentifier"
                                    value={projectIdentifier}
                                    onChange={(event) => setProjectIdentifier(event.target.value)} 
                                />
                                {
                                    errorId && (
                                        <label style={{color: 'red'}}>{errorId}</label>
                                    )
                                }
                            </div>
                            <div className="form-group">
                                <textarea 
                                    className="form-control form-control-lg" 
                                    placeholder="Project Description"
                                    name="description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                ></textarea>
                                {
                                    errorDescription && (
                                        <label style={{color: 'red'}}>{errorDescription}</label>
                                    )
                                }
                            </div>
                            <h6>Start Date</h6>
                            <div className="form-group">
                                <input 
                                    type="date" 
                                    className="form-control form-control-lg" 
                                    name="start_date" 
                                    value={start_date}
                                    onChange={(event) => setStartDate(event.target.value)} 
                                />
                            </div>
                            <h6>Estimated End Date</h6>
                            <div className="form-group">
                                <input 
                                    type="date" 
                                    className="form-control form-control-lg" 
                                    name="end_date" 
                                    value={end_date}
                                    onChange={(event) => setEndDate(event.target.value)} 
                                />
                            </div>

                            <input type="submit" className="btn btn-primary btn-block mt-4" onClick={(event) => handleSubmit(event)}/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProject;