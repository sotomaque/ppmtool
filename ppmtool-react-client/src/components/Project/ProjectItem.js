import React, { useContext, useEffect } from "react";

import ProjectContext from '../../context/ProjectContext';


const ProjectItem = () => {

  const projectContext = useContext(ProjectContext);
  const { getProjects, projects, loading } = projectContext;

  useEffect(() => {
    getProjects();
  }, [projects]);

  console.log(projects);

  function handleDelete(e, id) {
    e.preventDefault();
    // DELETE post request
    const requestOptions = {
        method: 'DELETE'
    };
    fetch(`http://www.localhost:8080/api/project/${id}`, requestOptions);
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
                      <button onClick={(e) => handleDelete(e, project.projectIdentifier)} style={{ border: 'none' }}>
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
