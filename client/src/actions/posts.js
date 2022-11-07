import * as api from '../api';
import { FETCH_ALL, CREATE, DELETE, LIKE, UPDATE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_POST } from '../constants/actionTypes'
//Action Creators
export const getPosts = (page) => async (dispatch) => {
    console.log('getPosts => page', page)
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page)
        console.log('data:', data)
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(`[ERROR]: getPosts() -> ${error}`)
    }

}
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id)
        console.log('data:', data)
        dispatch({ type: FETCH_POST, payload: data })
        dispatch({ type: END_LOADING })
    } catch (error) {
        console.log(`[ERROR]: getPosts() -> ${error}`)
    }

}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPostsBySearch(searchQuery)
        dispatch({ type: FETCH_BY_SEARCH, payload: data })
        dispatch({ type: END_LOADING })

    } catch (error) {
        console.log('error:', error)
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.createPpost(post)
        console.log('data:', data)
        history.push(`/posts/${data?._id}`)
        dispatch({
            type: CREATE,
            payload: data
        })
        dispatch({ type: END_LOADING })

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
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(`[ERROR]: deletePost() -> ${error}`)

    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(`[ERROR]: likePost() -> ${error}`)
    }
}