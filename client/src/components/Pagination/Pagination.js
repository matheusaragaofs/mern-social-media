import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'

import useStyles from './styles'
import { Link } from 'react-router-dom'

 export default () => {
    const classes = useStyles()

  return (
    <Pagination
        classes={{url: classes.ul}}
        count={5}
        page={1}
        variant='outlined'
        color='primary'
        renderItem={(item)=> (<PaginationItem {...item } component={Link} to={`/posts?page=${1}`}/>)}
    />
  )
}
