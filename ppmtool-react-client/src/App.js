import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import LandingPage from './pages/LandingPage/LandingPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

import AddProjectPage from './pages/AddProjectPage/AddProjectPage';
import EditProjectPage from './pages/EditProjectPage/EditProjectPage';

import ProjectBoardPage from './pages/ProjectBoardPage/ProjectBoardPage';
import AddProjectTaskPage from './pages/AddProjectTaskPage/AddProjectTaskPage';
import EditProjectTaskPage from './pages/EditProjectTaskPage/EditProjectTaskPage';

import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';




function App() {

  return (
    <Provider store={store}>
      <Router>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={DashboardPage} />

            <Route path="/addProject" component={AddProjectPage} />
            <Route path="/editProject/:id" component={EditProjectPage} />

            <Route exact path="/projectBoard/:id" component={ProjectBoardPage} />
            <Route path="/projectBoard/:id/addTask" component={AddProjectTaskPage} />
            <Route path="/projectBoard/:id/editTask/:task_id" component={EditProjectTaskPage} />

            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
          </Switch>
      </Router>
    </Provider>
    
  );
}

export default App;
