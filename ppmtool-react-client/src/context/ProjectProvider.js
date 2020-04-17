import React, { useReducer } from 'react';
import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';

const ProjectProvider = (props) => {

    const initialState = {
        projects: [],
        currentProject: null,
        loading: true
    }

    const [state, dispatch] = useReducer(ProjectReducer, initialState);

    const getProjects = async () => {
        try {
            dispatch({
                type: 'SENDING_REQUEST'
            });

            const res = await fetch('http://www.localhost:8080/api/project/all');
            const data = await res.json();

            dispatch({ 
                type: 'REQUEST_FINISHED'
            });

            dispatch({ 
                type: 'SET_PROJECTS',
                payload: data
            });

        } catch (e) {
            console.error(e);
        }
    }

    const deleteProject = async (id) => {
        
        try {
            const requestOptions = {
                method: 'DELETE'
            };

            dispatch({ type: 'SENDING_REQUEST' });
            await fetch(`http://www.localhost:8080/api/project/${id}`, requestOptions);
            dispatch({ type: 'REQUEST_FINISHED' });


        } catch (e) {
            console.error(e);
        }
        
    }

    return (
        <ProjectContext.Provider value={{
            projects: state.projects,
            currentProject: state.currentProject,
            loading: state.loading,
            getProjects,
            deleteProject
        }} >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider;