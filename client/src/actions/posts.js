import * as api from '../api';

//Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        const action = { type: 'FETCH_ALL', payload: data }
        dispatch(action)
    } catch (error) {
        console.log(`[ERROR]: getPosts() -> ${error.message}`)
    }
    
    
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPpost(post)
        dispatch({
            type:'CREATE',
            payload: data
        })
    } catch (error) {
        console.log(`[ERROR]: createPost() -> ${error.message}`)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({
            type: 'UPDATE',
            payload: data
        })
    } catch (error) {
        console.log(`[ERROR]: updatePost() -> ${error.message}`)
     }
}