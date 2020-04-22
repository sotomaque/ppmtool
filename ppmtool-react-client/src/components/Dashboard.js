import React from "react";
import ProjectItem from "./Project/ProjectItem";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/js/projectBoardStyle.js";

import CreateProjectButton from "./Project/CreateProjectButton";

import { connect } from 'react-redux';
import { getProjects } from '../actions/projectActions';


const useStyles = makeStyles(styles);

const Dashboard = (props) => {
  const classes = useStyles();

  React.useEffect(() => {
    props.getProjects();
  }, [])

  const projects = props.project.projects;

  return (
    <div className="pt-4 mb-4">
      <div className={classes.section}>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <CreateProjectButton />
        </div>
        <hr />
        <br />
        <div className="row">
          {
            projects && projects.map((project) => (
                <ProjectItem project={project} key={project.id}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  project: state.project
});

export default connect(mapStateToProps, {getProjects})(Dashboard);
