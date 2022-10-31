import axios from 'axios';

const url = 'http://localhost:5000/posts'

export const fetchPosts = async () => await axios.get(url)
export const createPpost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost)