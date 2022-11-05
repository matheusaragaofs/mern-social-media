import React, { useEffect, useState } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import Posts from '../Posts';
import Form from '../Form/Form';
import useStyles from './styles'
import Pagination from '../Pagination/Pagination';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';



function useQuery() {
    return new URLSearchParams(useLocation().search)
}
export const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    const query = useQuery();
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const searchPost = () => {
        if (search.trim()) {
        //dispatch -> fetch search post~
        // ["europe", "usa"] join ',' -> "europe,usa"
        dispatch(getPostsBySearch({ search, tags: tags.join(',')}))
        } else {
            history.push('/')

        }
    }
    const history = useHistory()
    const handleKeyPress = (e) => {
         if (e.keyCode === 13) {
            //13 enter key
            searchPost()
            //search
         }
    }
    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tag) => setTags(tags.filter((currTag) => currTag !== tag))
    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container justify='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} currentId={currentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField name='search' variant='outlined' 
                            onKeyPress={handleKeyPress}
                            label='Search Memories' fullWidth value={search} onChange={(e)=> setSearch(e.target.value)}/>
                            <ChipInput
                             style={{margin: '10px 0'}}
                             value={tags}
                             onAdd={handleAdd}
                             onDelete={handleDelete}
                             label='Search Tags'
                             variant='outlined'

                            />
                            <Button variant='outlined' onClick={searchPost} className={classes.searchButton} color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6}>
                            <Pagination className={classes.pagination} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
