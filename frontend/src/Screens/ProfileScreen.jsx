import React, { useState, useEffect } from 'react'
import { Container, TextField, makeStyles, Button, TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserDetails } from '../actions/userActions'
import { Preloader } from '../components/Preloader'
import { Error } from '../components/Error'
import { getMyOrders } from '../actions/orderActions'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em',
        display: 'flex'
    },
    title: {
        marginTop: '1em',
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
        width: '35%',
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
    profile: {
        width: '40%'
    },
    orders: {
        borderLeft: '1px solid grey'
    }
}));


export const ProfileScreen = ({ history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userLogin.userInfo);
    const userDetails = useSelector(state => state.userDetails);
    const { loading: listLoading, error: listError, orders } = useSelector(state => state.orderListMy);
    const { loading, error, user } = userDetails;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [warning, setWarning] = useState('');

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || user.name !== name) {
                dispatch(getUserDetails('profile'));
                dispatch(getMyOrders());
            }
            setName(user?.name);
            setEmail(user?.email);
        }

    }, [dispatch, history, userInfo, user, name])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setWarning(`Passwords don't match`);
            return
        }
        dispatch(updateUserDetails({ id: user._id, name, email, password }))
    }


    return (
        <>
            <Container maxWidth='lg' className={classes.root}>
                <Container className={classes.profile}>{error && <Error error={error} />}
                    {(warning||listError) && <Error error={warning} />}
                    {(loading || !user) && <Preloader />}
                    <h3 className={classes.title}>USER PROFILE</h3>
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
                        </div>
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
                        <div className={classes.inputWrap}>
                            <TextField
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                fullWidth
                                id="password"
                                label=" New Password"
                                type="password"
                                variant="outlined"
                                placeholder="Enter new password..." />
                        </div>
                        <div className={classes.inputWrap}>
                            <TextField
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                fullWidth
                                id="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                variant="outlined"
                                placeholder="Confirm new password..." />
                        </div>
                        <div className={classes.buttonWrap}>
                            <Button
                                type='submit'
                                className={classes.button}
                                variant='contained'>UPDATE</Button>
                        </div>
                    </form>
                </Container>
                <Container className={classes.orders}>{error && <Error error={error} />}
                    {listLoading && <Preloader />}
                    <h3 className={classes.title}>MY ORDERS</h3>
                    <TableContainer>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell >ID</TableCell>
                                    <TableCell align="center">DATE</TableCell>
                                    <TableCell align="center">TOTAL</TableCell>
                                    <TableCell align="center">PAID</TableCell>
                                    <TableCell align="center">DELIVERED</TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell component="th" scope="row">
                                            {row._id}
                                        </TableCell>
                                        <TableCell align="center">{row.createdAt.substring(0, 10)}</TableCell>
                                        <TableCell align="center">${row.totalPrice}</TableCell>
                                        <TableCell align="center">{row.isPaid ? row.paidAt.substring(0, 10) : '❌'}</TableCell>
                                        <TableCell align="center">{row.isDelivered ? '✅' : '❌'}</TableCell>
                                        <TableCell align="center"><Button variant='contained'><Link to={`/order/${row._id}`}>DETAILS</Link></Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Container>
        </>

    )
}