import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'

import useStyles from './styles'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../actions/posts'
export default ({ page, className }) => {
  console.log('page pagination:', page)
  const classes = useStyles()
  const dispatch = useDispatch()
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    console.log('ENTROU AQ')
    if (page) dispatch(getPosts(page))
  }, [page])

  return (
    <Pagination
      className={className}
      classes={{ url: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant='outlined'
      color='primary'
      renderItem={(item) => (<PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />)}
    />
  )
}

