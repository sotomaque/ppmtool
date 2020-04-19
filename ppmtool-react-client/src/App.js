import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage/LandingPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AddProject from './components/Project/AddProject';
import EditProject from './components/Project/EditProject';
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
          <Route path="/addProject" component={AddProject} />
          <Route path="/editProject/:id" component={EditProject} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
        </Switch>
      </ProjectProvider>
    </Router>
 
    
  );
}

export default App;
