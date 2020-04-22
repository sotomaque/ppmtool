import axios from "axios";
import { GET_ERRORS, GET_BACKLOG } from './types';

export const createProjectTask = (backlog_id, project_task, history) => async (dispatch) => {
    try {
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
        console.error(err);
    }
}