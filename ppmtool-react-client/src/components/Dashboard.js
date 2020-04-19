import React from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { Typography } from "@material-ui/core";

const Dashboard = () => {
  return (
    <div className="projects pt-4 mb-4">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <Typography variant="h2" color="textPrimary" align="center">Projects</Typography>
           
            <br />
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <CreateProjectButton />
            </div>
            
            
            <br />
            <hr />
            
            <ProjectItem />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
