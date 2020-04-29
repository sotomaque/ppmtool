import axios from "axios";
import { GET_ERRORS, GET_BACKLOG, GET_PROJECT_TASK, DELETE_PROJECT_TASK } from './types';

export const createProjectTask = (backlog_id, project_task, history) => async (dispatch) => {
    try {
        console.log('attempting to add project task: ', project_task);
        console.log('onto backlog with id: ', backlog_id)
        await axios.post(`http://www.localhost:8080/api/backlog/${backlog_id}`, project_task)
        history.goBack();
        dispatch({ type: GET_ERRORS, payload: {} });
    } catch(err) {
        console.error(err);
        dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
}

export const getBacklog = (backlog_id) => async (dispatch) => {
    try {
        const res = await axios.get(`http://www.localhost:8080/api/backlog/${backlog_id}`)
        dispatch({ type: GET_BACKLOG, payload: res.data });
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
}

export const deleteProjectTask = (project_sequence, backlog_id) => async (dispatch) => {
    try {
        await axios.delete(`http://www.localhost:8080/api/backlog/${project_sequence}/${backlog_id}`);
        dispatch({ type: DELETE_PROJECT_TASK, payload: backlog_id });
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
}

export const getTaskById = (backlog_id, task_id) => async (dispatch) => {
    try {
        const res = await axios.get(`http://www.localhost:8080/api/backlog/${backlog_id}/${task_id}`);
        dispatch({ type: GET_PROJECT_TASK, payload: res.data });
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
}

export const updateTask = (backlog_id, task_id, project_task, history) => async (dispatch) => {
    try {
        await axios.patch(`http://www.localhost:8080/api/backlog/${backlog_id}/${task_id}`, project_task);
        history.goBack();
        dispatch({ type: GET_ERRORS, payload: {} });
    } catch(err) {
        console.error(err);
        // dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
}