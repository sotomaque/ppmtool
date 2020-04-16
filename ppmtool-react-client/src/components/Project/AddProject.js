import React from 'react'

const AddProject = () => {
    const [projectName, setProjectName] = React.useState('');
    const [projectIdentifier, setProjectIdentifier] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [start_date, setStartDate] = React.useState('');
    const [end_date, setEndDate] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log('project name: ', projectName, ' projectDesc: ', description, ' projectId: ', projectIdentifier, ' start date: ', start_date, ' end date: ', end_date, '\n');
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h5 className="display-4 text-center">Create / Edit Project form</h5>
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
                            </div>
                            <div className="form-group">
                                <textarea 
                                    className="form-control form-control-lg" 
                                    placeholder="Project Description"
                                    name="description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                ></textarea>
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