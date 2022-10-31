import React, { useEffect } from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../api';
import { getPosts } from '../../actions/posts';
const Posts = ({setCurrentId}) => {
    const dispatch = useDispatch()
    const posts= useSelector((state) => state.posts)
    
    useEffect(()=> {
        dispatch(getPosts())

    },[])

        const classes = useStyles();
    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6}>
                    <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>))}
            </Grid>
        )
    )
}

export default Posts