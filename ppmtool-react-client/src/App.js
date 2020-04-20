import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

import AddProjectPage from './pages/AddProjectPage/AddProjectPage';
import EditProject from './components/Project/EditProject';

import ProjectBoardPage from './pages/ProjectBoardPage/ProjectBoardPage';
import AddProjectTaskPage from './pages/AddProjectTaskPage/AddProjectTaskPage';

import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';


import ProjectProvider from './context/ProjectProvider';


function App() {

  return (
    <Router>
      <ProjectProvider>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={DashboardPage} />

          <Route path="/addProject" component={AddProjectPage} />
          <Route path="/editProject/:id" component={EditProject} />

          <Route exact path="/project/:id" component={ProjectBoardPage} />
          <Route path="/project/:id/addTask" component={AddProjectTaskPage} />

          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Switch>
      </ProjectProvider>
    </Router>
 
    
  );
}

export default App;
