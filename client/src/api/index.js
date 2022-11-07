import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000' })

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchPosts = async (page) => API.get('/posts', { params: { page } })
export const fetchPost = async (id) => API.get(`/posts/${id}`)
export const fetchPostsBySearch = async (searchQuery) => API.get(`/posts/search`, {
    params: {
        search: searchQuery.search,
        tags: searchQuery.tags
    }
})

export const createPpost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`${'/posts'}/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`${'/posts'}/${id}`);
export const likePost = (id) => API.patch(`${'/posts'}/${id}/likePost`)


export const signIn = (formData) => API.post('/user/signIn', formData)
export const signUp = (formData) => API.post('/user/signUp', formData)