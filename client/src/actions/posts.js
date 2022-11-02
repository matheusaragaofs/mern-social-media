import * as api from '../api';
import { FETCH_ALL, CREATE, DELETE,LIKE,UPDATE} from '../constants/actionTypes'
//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        const action = { type: FETCH_ALL, payload: data }
        dispatch(action)
    } catch (error) {
        console.log(`[ERROR]: getPosts() -> ${error}`)
    }
    
    
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPpost(post)
        dispatch({
            type: CREATE,
            payload: data
        })
    } catch (error) {
        console.log(`[ERROR]: createPost() -> ${error}`)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(`[ERROR]: updatePost() -> ${error}`)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id})
    } catch (error) {
        console.log(`[ERROR]: deletePost() -> ${error}`)
        
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload: data})
    } catch (error) {
        console.log(`[ERROR]: likePost() -> ${error}`)
    }
}