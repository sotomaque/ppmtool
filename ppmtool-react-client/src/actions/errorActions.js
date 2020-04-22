import { GET_ERRORS } from "./types";

export const clearErrors = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ERRORS,
            payload: {}
          });
    } catch (err) {
        console.error(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
    }
}