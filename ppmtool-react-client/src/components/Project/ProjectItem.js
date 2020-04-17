import React, { useContext, useEffect } from "react";

import ProjectContext from '../../context/ProjectContext';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { CircularProgress } from '@material-ui/core';


const ProjectItem = () => {

  const projectContext = useContext(ProjectContext);
  const { getProjects, projects, loading } = projectContext;
  const [refetchData, setRefetchData] = React.useState(false);

  useEffect(() => {
    getProjects();
  }, [refetchData]);

  function showAlert(e, id) {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {handleDelete(e, id)}
        },
        {
          label: 'No',
          onClick: () => {return false;}
        }
      ]
    });
  }

  function handleDelete(e, id) {
    e.preventDefault();
    const requestOptions = {
      method: 'DELETE'
    };
    fetch(`http://www.localhost:8080/api/project/${id}`, requestOptions)
      .then(setRefetchData(true));
  }

  if (loading) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 50
        }}>
            <CircularProgress/>
        </div>
    );
  } 

  return (
    <div className="container">
      <div className="card card-body bg-light mb-3">
        {
          projects && projects.map(project => {
            return (
              <React.Fragment key={project.projectIdentifier}>
                <div className="row">
                  {/** Proj Category **/}
                  <div className="col-2">
                    <span className="mx-auto">{project.projectIdentifier}</span>
                  </div>
                  {/** Proj Name + Description **/}
                  <div className="col-lg-6 col-md-4 col-8">
                    <h3>{project.projectName}</h3>
                    <p>{project.description}</p>
                  </div>
                  {/** Proj Actions **/}
                  <div className="col-md-4 d-none d-lg-block">
                    <ul className="list-group">
                      <a href="#">
                        <li className="list-group-item board">
                          <i className="fa fa-flag-checkered pr-1">  Project Board </i>
                        </li>
                      </a>
                      <a href="#">
                        <li className="list-group-item update">
                          <i className="fa fa-edit pr-1">  Update Project Info</i>
                        </li>
                      </a>
                      <button onClick={(e) => showAlert(e, project.projectIdentifier)} style={{ border: 'none' }}>
                        <li className="list-group-item delete">
                          <i className="fa fa-minus-circle pr-1">  Delete Project</i>
                        </li>
                      </button>
                    </ul>
                  </div>
                  {/** End of Proj Actions **/}
                  
                </div>
                <hr />
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  );
};

export default ProjectItem;
