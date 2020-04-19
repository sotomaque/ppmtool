import React from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import Header from './Header/Header';
import HeaderLinks from './Header/HeaderLinks';

const Dashboard = () => {
  return (
    <div>
      <Header
        color="primary"
        brand="Personal Project Management"
        rightLinks={<HeaderLinks />}
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
      />
      <div className="projects pt-4 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />

              <CreateProjectButton />
              
              <br />
              <hr />
              
              <ProjectItem />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
