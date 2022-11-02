import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core'
import useStyles from './styles'
import Input from './Input'
import { GoogleLogin } from 'react-google-login';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import Icon from './Icon';
export const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const handleSubmit = () => { }
    const handleChange = () => { }
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
    const switchMode = () => setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    const googleSuccess = async (res) => {
        console.log(res)
    }
    const googleFailure = (error) => {
        console.log('error:', error)
        console.log('Google Sign In was unsuccessfull. Try Again Later')
    }
    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}></Avatar>
                <LockOutlinedIcon />
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (<>
                                <Input name='firstName' label='First Name' handleChange={handleChange} half />
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                            </>)
                        }
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} />}
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='208060749184-8an816ih1gabb8dm2thdvgl2nkgucp5n.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button className={classes.googleButton}
                                color='primary'
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant='contained'>
                                    Google Sign In
                                </Button>
                        )}

                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy='single_host_origin'
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
