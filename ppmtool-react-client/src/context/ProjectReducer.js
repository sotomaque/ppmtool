export default (state, action) => {

    switch(action.type) {

        case 'SET_PROJECTS':
            return {
                ...state,
                projects: action.payload
            }
        
        case 'SET_PROJECT':
            return {
                ...state,
                selectedProject: action.payload
            }

        case 'SET_BACKLOG':
            return {
                ...state,
                backlog: action.payload
            } 

        case 'SENDING_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'REQUEST_FINISHED':
            return {
                ...state,
                loading: false
            }

        case 'DELETED_SUCCESSFULLY':
            return {
                ...state
            }

        default:
            throw new Error;
    }
    
}