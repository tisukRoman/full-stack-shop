import React, { useState, useEffect } from 'react'
import { Container, TextField, makeStyles, Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { Preloader } from '../components/Preloader'
import { Error } from '../components/Error'


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em'
    },
    title: {
        marginTop: '2em',
        fontSize: '2rem',
        fontWeight: '400',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputWrap: {
        marginTop: '2em',
        width: '100%',
    },
    buttonWrap: {
        marginTop: '2em',
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


export const RegisterScreen = ({ location, history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [warning, setWarning] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setWarning(`Passwords don't match`);
            return
        }
        dispatch(register(name, email, password));
    }


    return (
        <Container maxWidth='sm' className={classes.root}>
            {error && <Error error={error} />}
            {warning && <Error error={warning} />}
            {loading && <Preloader />}
            <h3 className={classes.title}>SIGN UP</h3>
            <form onSubmit={submitHandler}>
                <div className={classes.inputWrap}>
                    <TextField
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                        id="name"
                        label="Name"
                        variant="outlined"
                        placeholder="Enter your name..." />
                    <div className={classes.inputWrap}>
                        <TextField
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            fullWidth
                            id="email"
                            label="Email"
                            variant="outlined"
                            placeholder="Enter email..." />
                    </div>
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
                <div className={classes.inputWrap}>
                    <TextField
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        placeholder="Confirm Password..." />
                </div>
                <div className={classes.buttonWrap}>
                    <Button
                        type='submit'
                        className={classes.button}
                        variant='contained'>sign up</Button>
                </div>
                <div className={classes.registerLink}>
                    <Typography>Has Account?
                        <Link to={redirect ? `/login?redirect=${redirect}` : `/login`}><strong> Login </strong></Link>
                    </Typography>
                </div>
            </form>
        </Container>
    )
}