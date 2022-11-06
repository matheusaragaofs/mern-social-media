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
    console.log('console.log(useLocation()):', useLocation())
    const classes = useStyles();
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    const query = useQuery();
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const searchPost = (e) => {
        console.log('ENTROU SEARCH POST')
        if (search.trim() || tags) {
            //dispatch -> fetch search post~
            // ["europe", "usa"] join ',' -> "europe,usa"
            console.log('VERIF 1')
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            console.log('VERIF 1.2')
            // history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            console.log('VERIF 2')
            history.push('/')

        }
    }
    const history = useHistory()
    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }
    const handleAdd = (tag) => setTags([...tags, tag])
    const handleDelete = (tag) => setTags(tags.filter((currTag) => currTag !== tag))


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
                                label='Search Memories' fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search Tags'
                                variant='outlined'

                            />
                            <Button variant='outlined' onClick={searchPost} className={classes.searchButton} color='primary'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) &&
                            <Paper elevation={6}>
                                <Pagination page={page} className={classes.pagination} />
                            </Paper>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
