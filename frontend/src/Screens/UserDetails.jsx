import React, { useState, useEffect } from 'react'
import { Container, TextField, makeStyles, Button, Typography, Checkbox } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById, updateUserByAdmin } from '../actions/userActions'
import { Preloader } from '../components/Preloader'
import { Error } from '../components/Error'


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em'
    },
    title: {
        marginTop: '1.5em',
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
    },
    checkbox: {
        marginTop: '1.5em',
        width: '8em'
    },
    checkLabel: {
        color: 'grey',
        fontSize: '1.2rem',

    },
    backBtn: {
        paddingTop: '1em',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'grey'
    },
}));


export const UserDetailsScreen = ({ history, match }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector(state => state.userGet);
    const userId = match.params.id;
    const userInfo = useSelector(state => state.userLogin.userInfo)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }
        if (!user?.name || user?._id !== userId) {
            dispatch(getUserById(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, user, userId, userInfo, history])

    const updateHandler = (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure?')) {
            dispatch(updateUserByAdmin(userId, { name, email, isAdmin }))
        }
    }

    return (
        <Container maxWidth='sm' className={classes.root}>
            {error && <Error error={error} />}
            {loading && <Preloader />}
            <Link to='/admin/userlist'>
                <Typography className={classes.backBtn} component='h4'>
                    Go Back
                </Typography>
            </Link>
            <h3 className={classes.title}>UPDATE USER</h3>
            <form onSubmit={updateHandler}>
                <div className={classes.inputWrap}>
                    <TextField
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                        id="name"
                        label="Name"
                        variant="outlined"
                        placeholder="Enter name..." />
                </div>
                <div className={classes.inputWrap}>
                    <TextField
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        fullWidth
                        id="email"
                        label="Email"
                        type="email"
                        variant="outlined"
                        placeholder="Enter email..." />
                </div>
                <div className={classes.checkbox}>
                    <label className={classes.checkLabel}>
                        <Checkbox
                            label="Admin"
                            color="primary"
                            checked={isAdmin}
                            onChange={e => setIsAdmin(e.target.checked)}
                        />
                        ADMIN
                    </label>
                </div>

                <div className={classes.buttonWrap}>
                    <Button
                        type='submit'
                        className={classes.button}
                        variant='contained'>update</Button>
                </div>
            </form>
        </Container>
    )
}