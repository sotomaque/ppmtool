export default (state, action) => {
    switch(action.type) {

        case 'SET_PROJECTS':
            return {
                ...state,
                projects: action.payload
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

        default:
            throw new Error;
    }
}