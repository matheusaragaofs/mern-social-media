import { FETCH_ALL, DELETE, CREATE, UPDATE, LIKE } from "../constants/actionTypes";

const reducer = (state = [], action) => {
    const { type, payload } = action;

    switch (type) {
        case DELETE:
            const id = payload;
            return state.filter((post) => post._id !== id);
        case FETCH_ALL:
            return payload;
        case CREATE:
            return [...state, payload ]
        case UPDATE:
        case LIKE:
            return state.map(post => post._id === payload._id ? payload : post)
        default:
            return state;
    }
}

export default reducer