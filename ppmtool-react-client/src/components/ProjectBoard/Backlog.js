import React from 'react';
import ProjectTask from './ProjectTasks/ProjectTask';



const Backlog = ({ backlog }) => {


    let todoItems = [];
    let inProgressItems = [];
    let doneItems = [];

    backlog.forEach(task => {
        if (task.status === 'TO_DO') {
            todoItems.push(task)
        } else if (task.status === 'IN_PROGRESS') {
            inProgressItems.push(task)
        } else {
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
                    todoItems && todoItems.map(task => {
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
                    inProgressItems && inProgressItems.map(task => {
                        return (
                            <ProjectTask task={task} key={task.id} />
                        )
                    })
                }
            </div>

            {/*  Done  */}
            <div className="col-md-4">
                <div className="card text-center mb-2">
                    <div className="card-header bg-success text-white">
                        <h3>Done</h3>
                    </div>
                </div>
                {
                    doneItems && doneItems.map(task => {
                        return (
                            <ProjectTask task={task} key={task.id} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Backlog;