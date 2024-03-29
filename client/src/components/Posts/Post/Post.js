import React, { useState } from 'react';
import useStyles from './styles'
import moment from 'moment'
import { Card, CardActions, CardContent, Button, Typography, CardMedia, ButtonBase } from '@material-ui/core'
import {
    ThumbUpAlt as ThumbUpAltIcon,
    ThumbUpAltOutlined as ThumbUpAltOutlinedIcon,
    Delete as DeleteIcon,
    MoreHoriz as MoreHorizIcon,

} from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts';
import { useHistory } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
    const history = useHistory()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const Likes = () => {
        if (post?.likes?.length > 0) {
            return post?.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize='small' /> &nbsp; {post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) :
                (
                    <><ThumbUpAltOutlinedIcon fontSize='small' /> &nbsp; {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                )
        }
        return <><ThumbUpAltOutlinedIcon fontSize='small' />&nbsp; Like</>
    }

    const openPost = () => history.push(`/posts/${post._id}`)

    const dispatch = useDispatch()
    const classes = useStyles();
    return (
        <Card className={classes.card} raised elevation={6} >
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant='body1'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.CreatedAt).fromNow()}</Typography>
            </div>
            {user?.result?.googleId === post?.creator || user?.result?._id === post?.creator && (
                <div className={classes.overlay2}>
                    <Button style={{ color: 'white' }} size='small' onClick={() => {
                        setCurrentId(post._id)
                    }}>
                        <MoreHorizIcon fontSize='default' />
                    </Button>
                </div>
            )}

            <div style={{ cursor: 'pointer' }} onClick={openPost}>
                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post?.tags?.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant='h5' gutterBottom >{post.title}</Typography>
                <CardContent>
                    <Typography variant='body2' color='textSecondary' component='p' >{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button disabled={!user?.result} size='small' color='primary' onClick={(e) => {
                        e.stopPropagation()
                        dispatch(likePost(post._id))
                    }}>
                        <Likes />
                    </Button>
                    {user?.result?.googleId === post?.creator || user?.result?._id === post?.creator && (
                        <Button size='small' color='primary' onClick={(e) => {
                            e.stopPropagation()
                            dispatch(deletePost(post._id)) }}>
                            <DeleteIcon fontSize='small' />
                            Delete
                        </Button>

                    )}
                </CardActions>
            </div>
        </Card>
    )
}

export default Post