import React from "react";
import ProjectItem from "./Project/ProjectItem";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/js/projectBoardStyle.js";

import CreateProjectButton from "./Project/CreateProjectButton";

const useStyles = makeStyles(styles);

const Dashboard = () => {
  const classes = useStyles();
  return (
    <div className="pt-4 mb-4">
      <div className={classes.section}>
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <CreateProjectButton />
        </div>
        <hr />
        <br />
        <div className="row">
          <ProjectItem />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
