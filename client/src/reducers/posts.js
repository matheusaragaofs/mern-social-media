import { FETCH_ALL, FETCH_POST, DELETE, CREATE, UPDATE, LIKE, FETCH_BY_SEARCH, START_LOADING, END_LOADING } from "../constants/actionTypes";

const reducer = (state = { isLoading: true, posts: [] }, action) => {
    const { type, payload } = action;

    switch (type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }

        case FETCH_ALL:
            const { data: posts, currentPage, numberOfPages } = payload
            return {
                ...state,
                posts,
                currentPage,
                numberOfPages
            }

        case FETCH_BY_SEARCH:
            return { ...state, posts: payload }
        case FETCH_POST:
            return { ...state, post: payload }

        case CREATE:
            return { ...state, posts: payload }

        case DELETE:
            const id = payload;
            return { ...state, posts: state.posts.filter((post) => post._id !== id) }

        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map(post => post._id === payload._id ? payload : post) }

        default:
            return state
    }
}

export default reducer