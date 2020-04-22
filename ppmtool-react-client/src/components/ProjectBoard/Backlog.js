import React from 'react';
import ProjectTask from './ProjectTasks/ProjectTask';



const Backlog = ({ backlog }) => {


    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    backlog.forEach(task => {
        if (task.status === 'TO_DO') {
            console.log("TODO FOUND");
            todoItems.push(task)
        } else if (task.status === 'IN_PROGRESS') {
            console.log("INPROGRESS FOUND");
            inProgressItems.push(task)
        } else {
            console.log('DONE FOUND');
            doneItems.push(task)
        }
    });

    return (
        <div className="row">
            {/* TODO */}
            <div className="col-md-4">
                <div className="card text-center mb-2">
                    <div className="card-header bg-secondary text-white">
                        <h3>TO DO</h3>
                    </div> 
                </div>
                {
                    backlog && backlog.map(task => {
                        return (
                            <ProjectTask task={task} key={task.id} />
                        )
                    })
                }
                
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