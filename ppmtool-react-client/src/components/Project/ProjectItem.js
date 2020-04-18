import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import ProjectContext from '../../context/ProjectContext';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CircularProgress, Button } from '@material-ui/core';
import Moment from 'react-moment';


const ProjectItem = () => {

  const projectContext = useContext(ProjectContext);
  const { getProjects, deleteProject, projects, loading } = projectContext;
  const [refetchData, setRefetchData] = React.useState(false);

  useEffect(() => {
    getProjects();
    setRefetchData(false)
  }, [refetchData]);

  console.log(projects);
  
  function showAlert(id) {

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure?</h1>
            <p>This Action Cannot be Undone</p>
            <Button variant="contained" color="primary"  onClick={onClose}>
              No
            </Button>
            <Button className="float-right" variant="contained" color="secondary" onClick={() => {
              removeProject(id)
              onClose();
            }}>
              Yes, Delete it!
            </Button>
          </div>
        );
      }
    })
  }

  async function removeProject(id) {
    await deleteProject(id);
    setRefetchData(true);
    console.log(refetchData);
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
          projects && projects.map((project, index) => {
            return (
              <React.Fragment key={project.projectIdentifier}>
                <div className="row">                  
                  {/** Proj Category **/}
                  <div className="col-2">
                    <span className="mx-auto">Project ID: {project.projectIdentifier}</span>
                  </div>
                  {/** Proj Name + Description **/}
                  <div className="col-lg-4 col-md-4 col-8">
                    <h3>{project.projectName}</h3>
                    <p>{project.description}</p>
                  </div>
                  {/** Proj Start End **/}
                  <div className="col-lg-2 d-none d-lg-block">
                    <p>Started on</p>
                    <span><Moment format="MM/DD/YYYY" date={project.start_date} /></span>
                  </div>
                  {/** Proj Start End **/}
                  <div className="col-lg-2 d-none d-lg-block">
                    <p>Ends on</p>
                    <span><Moment format="MM/DD/YYYY" date={project.end_date} /></span>
                  </div>

                  {/** Proj Actions **/}
                  <div className="col-md-2 d-none d-lg-block">
                    <ul className="list-group">
                      <a href="#">
                        <li className="list-group-item board">
                          <i className="fa fa-flag-checkered pr-1">  Project Board </i>
                        </li>
                      </a>
                      <Link to={`/editProject/${project.projectIdentifier}`}>
                        <li className="list-group-item update">
                          <i className="fa fa-edit pr-1">  Update Project Info</i>
                        </li>
                      </Link>
                      <div onClick={() => showAlert(project.projectIdentifier)} style={{ border: 'none' }}>
                        <li className="list-group-item delete">
                          <i className="fa fa-minus-circle pr-1">  Delete Project</i>
                        </li>
                      </div>
                    </ul>
                  </div>
                  {/** End of Proj Actions **/}
                  
                </div>

                {
                  (index === projects.length - 1) ? <></> : <hr />
                }
     
                
              </React.Fragment>
            )
          })
        }
      </div>
    </div>
  );
};

export default ProjectItem;
