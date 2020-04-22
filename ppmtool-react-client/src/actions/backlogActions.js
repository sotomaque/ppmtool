import axios from "axios";

export const createProjectTask = (backlog_id, project_task, history) => async (dispatch) => {
    try {
        await axios.post(`http://www.localhost:8080/api/backlog/${backlog_id}`, project_task)
        console.log('success posting task')
        history.goBack();
    }catch(err) {
        console.error(err);
    }

}