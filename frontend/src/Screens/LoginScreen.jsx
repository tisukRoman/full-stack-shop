import React, { useState, useEffect } from 'react'
import { Container, TextField, makeStyles, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { Preloader } from '../components/Preloader'
import { Error } from '../components/Error'


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em'
    },
    title: {
        marginTop: '2.5em',
        fontSize: '2rem',
        fontWeight: '400',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputWrap: {
        marginTop: '2.5em',
        width: '100%',
    },
    buttonWrap: {
        marginTop: '2.5em',
        width: '30%',
    },
    button: {
        transition: '0.3s',
        width: '100%',
        backgroundColor: 'black',
        color: 'white',
        lineHeight: '3em',
        '&:hover': {
            backgroundColor: 'black',
            color: 'yellow',
            transform: 'scale(1.05)'
        }
    },
    registerLink: {
        marginTop: '1.5em',
    }
}));


export const LoginScreen = ({ location, history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }


    return (
        <Container maxWidth='sm' className={classes.root}>
            {error && <Error error={error} />}
            {loading && <Preloader />}
            <h3 className={classes.title}>SIGN IN</h3>
            <form onSubmit={submitHandler}>
                <div className={classes.inputWrap}>
                    <TextField
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        id="email"
                        label="Email"
                        variant="outlined"
                        placeholder="Enter email..." />
                </div>
                <div className={classes.inputWrap}>
                    <TextField
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        placeholder="Enter password..." />
                </div>
                <div className={classes.buttonWrap}>
                    <Button
                        type='submit'
                        className={classes.button}
                        variant='contained'>sign in</Button>
                </div>
                <div className={classes.registerLink}>
                    <Typography>New Customer?
                        <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}><strong> Register </strong></Link>
                    </Typography>
                </div>
            </form>
        </Container>
    )
}
