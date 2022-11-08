import { Button, TextField, Typography } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'
import useStyles from './styles'
const CommentsSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch();
    const commentsRef = useRef()
    const classes = useStyles()
    const [comments, setComments] = useState(post.comments)
    const [comment, setComment] = useState('')

    const handleClick = async () => {
        const finalComment = `${user.result.name}:  ${comment}`
        const newCommnents = await dispatch(commentPost(finalComment, post._id))
        setComments(newCommnents)
        setComment('')
        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }


    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((comment, index) => {
                        const [username, userComment] = comment.split(':')
                        return <Typography key={index} gutterBottom variant='subtitle1'>
                            <strong>{username}:</strong>
                            {userComment}
                            </Typography>
                    }
                    )}
                    <div ref={commentsRef} />
                </div>
                {user?.result?.name &&
                    <div style={{ width: "70%" }}>
                        <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant='outlined'
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Button color='primary' style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' onClick={handleClick} >Comment</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CommentsSection