import React, { useState, useEffect } from 'react'
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core'
import useStyles from './styles'
import memories from '../../images/memories.png'
import { Link, useHistory } from 'react-router-dom' 
import { history, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'
export const Navbar = () => {
    const classes = useStyles()
    const [ user , setUser ] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
        setUser(null)
}


    useEffect(() => {
        const token = user?.token 
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime()) logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    } ,  [location])


    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} component={Link} to='/' variant='h2' align='center'>
                    Memories
                </Typography>
                <img className={classes.image} src={memories} alt='memories' width={60} />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                                    {user.result.name.charAt(0)}
                                </Avatar>
                                <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                                <Button variant='contained' onClick={logout} className={classes.logout} color='secondary'>Logout</Button>
                    </div>
                ): (
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

