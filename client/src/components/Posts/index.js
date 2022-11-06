import React, { useEffect } from 'react';
import Post from './Post/Post';
import { Grid, CircularProgress } from '@material-ui/core'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../api';
import { getPosts } from '../../actions/posts';
const Posts = ({setCurrentId, currentId}) => {
    const { posts, isLoading } = useSelector((state) => state.posts)

    const classes = useStyles();

    if (!posts.length && !isLoading) return 'No posts'
    
    return (
            isLoading ? <CircularProgress/> : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                    <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>))}
            </Grid>
        )
    )
}

export default Posts