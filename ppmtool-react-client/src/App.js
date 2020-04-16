import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import AddProject from './components/Project/AddProject';
import Header from './components/Layout/Header';

import ProjectProvider from './context/ProjectProvider';




function App() {

  return (
    <Router>
      <ProjectProvider>
        <Header />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/addProject" component={AddProject} />
        </Switch>
      </ProjectProvider>
    </Router>
 
    
  );
}

export default App;
