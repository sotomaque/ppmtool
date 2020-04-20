import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import ProjectContext from '../../context/ProjectContext';

import { makeStyles } from '@material-ui/core/styles';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CircularProgress, Button, Typography } from '@material-ui/core';
import Launch from '@material-ui/icons/Launch';
import DeleteIcon from '@material-ui/icons/Delete';
import Update from '@material-ui/icons/Update';

import Alert from '@material-ui/lab/Alert';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ProjectItem = () => {
  const classes = useStyles();
  let history = useHistory();
  const location = useLocation();

  const projectContext = useContext(ProjectContext);
  const { getProjects, deleteProject, projects, loading } = projectContext;
  const [refetchData, setRefetchData] = React.useState(false);

  const [showSuccessDeleteAlert, setShowSuccessDeleteAlert] = React.useState(false);
  const [showSuccessAddedAlert, setShowSuccessAddedAlert] = React.useState(false);

  useEffect(() => {
    getProjects();
    setRefetchData(false);
    showSuccessAdded();
  }, [refetchData, location]);


  function showSuccessDeleted() {
    setShowSuccessDeleteAlert(true);
    setTimeout(() => {
      setShowSuccessDeleteAlert(false)
    }, 3000)
  }

  function showSuccessAdded() {
    if (location.showSuccessAlert) {
      setShowSuccessAddedAlert(true)
      setTimeout(() => {
        setShowSuccessAddedAlert(false);
      }, 3000)
    }
    
  }
  
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
              removeProject(id);
              onClose();
              showSuccessDeleted();
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

  function handleUpdateClicked(projectIdentifier) {
    history.push(`/editProject/${projectIdentifier}`);
  }

  return (
    <>
      {
        showSuccessDeleteAlert && <Alert severity="success">Project Successfully Deleted!</Alert>
      }
      {
        showSuccessAddedAlert && <Alert severity="success">Project Successfully Added to Board!</Alert>
      }
      <div className="card card-body bg-light mb-3">
        {
          projects && projects.map((project, index) => {
            return (
              <React.Fragment key={project.projectIdentifier}>
                <div className="row">                  
                  {/** Proj Category **/}
                  <div className="col-2">
                    <span><Typography variant="subtitle1" color="textPrimary">Project ID: {project.projectIdentifier}</Typography></span>
                  </div>
                  {/** Proj Name + Description **/}
                  <div className="col-lg-4 col-md-4 col-8">
                    <Typography variant="h4" color="textPrimary">{project.projectName}</Typography>
                    <Typography variant="subtitle1" color="textPrimary">{project.description}</Typography>
                  </div>
                  
                  {/** Proj Start End **/}
                  <div className="col-lg-2 d-none d-lg-block">
                    
                    {
                      project.start_date !== null ? 
                      (<><p>Started on</p><span><Moment format="MM/DD/YYYY" date={project.start_date} style={{color: 'blue'}} /></span></>) : 
                      <span style={{color: 'blue', fontSize: '14px'}}>Click <em>Update Project</em> to set a Start Date</span>
                    }
                    
                  </div>
                  {/** Proj Start End **/}
                  <div className="col-lg-2 d-none d-lg-block">
                    {
                      project.end_date !== null ? 
                      (<><p>Ends on</p><span><Moment format="MM/DD/YYYY" date={project.end_date} style={{color: 'blue'}} /></span></>) : 
                      <span style={{color: 'blue', fontSize: '14px'}}>Click <em>Update Project</em> to set a End Date</span>
                    }
                  </div>

                  {/** Proj Actions **/}
                  <div className="col-md-2 d-none d-lg-block">
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      startIcon={<Launch />}
                      onClick={() => history.push(`/project/${project.projectIdentifier}`)}
                      fullWidth={true}
                    >
                      Launch
                    </Button>  
                    <br/>
                    <Button
                      variant="contained"
                      color="secondary"
                      className={classes.button}
                      startIcon={<DeleteIcon />}
                      onClick={() => showAlert(project.projectIdentifier)}
                      fullWidth={true}
                    >
                      Delete
                    </Button>  
                    <br />
                    <Button
                      variant="contained"
                      color="default"
                      className={classes.button}
                      startIcon={<Update />}
                      onClick={() => handleUpdateClicked(project.projectIdentifier)}
                      fullWidth={true}
                    >
                      Edit
                    </Button>
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
    </>
  );
};

export default ProjectItem;
