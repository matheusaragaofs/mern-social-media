import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid } from '@material-ui/core'
import { getPosts } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import Posts from '../Posts';
import Form from '../Form/Form';
import useStyles from './styles'

export const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

  return (
    <Grow in>
    <Container>
        <Grid container className={classes.mainContainer} justify='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId} currentId={currentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
        </Grid>
    </Container>
</Grow>
  )
}
