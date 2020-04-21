import React, { useContext, useEffect } from 'react';
import ProjectContext from '../../context/ProjectContext';

import ProjectTask from './ProjectTasks/ProjectTask';

const Backlog = () => {

    const projectContext = useContext(ProjectContext);
    const { backlog } = projectContext;

    useEffect(() => {
        console.log(backlog)
    }, [backlog]) 

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    return (
        <div className="row">
        {/* TODO */}
        <div className="col-md-4">
            <div className="card text-center mb-2">
                <div className="card-header bg-secondary text-white">
                    <h3>TO DO</h3>
                </div>
                {
                    !isEmpty(backlog) && backlog.map(task => {
                        return (
                            <React.Fragment key={task.id}>
                                <ProjectTask key={task.id} task={task} />
                                <br />
                            </React.Fragment>)
                    })
                }
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
    )
}

export default Backlog;