import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from "jwt-decode";

import setJWTToken from '../securityUtils/setJWTToken';

export const createNewUser = (newUser, history) => async (dispatch) => {
    try {
        await axios.post("http://www.localhost:8080/api/users/register", newUser);
        history.push('/login');
        dispatch({ type: GET_ERRORS, payload: {} });
    } catch (err) {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
    }
}

export const login = (loginRequest) => async (dispatch) => {

    try {
        // post => Login request
        const res = await axios.post("http://www.localhost:8080/api/users/login", loginRequest);
        // extract token from res.data
        const { token } = res.data;
        // store token in localStorage
        localStorage.setItem('jwtToken', token);
        // set our token in header ***
        setJWTToken(token);
        // decode token
        const decoded = jwt_decode(token);
        // dispatch to our securityReducer
        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });
        dispatch({ type: GET_ERRORS, payload: {} });
    } catch (err) {
        console.error(err)
    }
}