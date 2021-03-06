import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";

export const createProject = (project, history) => async (dispatch) => {
  try {
    await axios.post("http://www.localhost:8080/api/project", project);
    history.push("/dashboard");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {

    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });

  }
};

export const getProjects = () => async (dispatch) => {
  try {
    const res = await axios.get("http://www.localhost:8080/api/project/all");
    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getProjectById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://www.localhost:8080/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch(err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteProject = id => async dispatch => {

  await axios.delete(`http://www.localhost:8080/api/project/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: id
    });
  
};