import React from 'react'
import ProjectItem from './Project/ProjectItem';

const Dashboard = () => {
    return (
        <>
            <h2 className="alert alert-warning">Welcome to Dashboard</h2>
            <ProjectItem />
            <ProjectItem />
            <ProjectItem />
        </>
    )
}

export default Dashboard;