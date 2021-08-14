import { Button, Container, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Preloader } from '../components/Preloader'
import { useDispatch, useSelector } from 'react-redux';
import { Error } from '../components/Error';
import { getAllOrders } from './../actions/orderActions';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em',
    },
    title: {
        marginTop: '1em',
        fontSize: '2rem',
        fontWeight: '400',
    },
}));


export const OrdersScreen = ({ history }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.orderListAll)
    const userInfo = useSelector(state => state.userLogin.userInfo)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getAllOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, userInfo, history])



    return (
        <Container className={classes.root}>
            <Container className={classes.orders}>
                {loading && <Preloader />}
                {error && <Error error={error}/>}
                <h3 className={classes.title}>ORDER LIST</h3>
                <TableContainer>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell >ID</TableCell>
                                <TableCell align="left">USER</TableCell>
                                <TableCell align="left">DATE</TableCell>
                                <TableCell align="left">TOTAL</TableCell>
                                <TableCell align="center">PAID</TableCell>
                                <TableCell align="center">DELIVERED</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders?.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell component="th" scope="row">{row._id}</TableCell>
                                    <TableCell align="left">{row.user.name}</TableCell>
                                    <TableCell align="left">{row.createdAt.substring(0, 10)}</TableCell>
                                    <TableCell align="left">${row.totalPrice}</TableCell>
                                    <TableCell align="center">{row.isPaid ? row.paidAt.substring(0, 10) : '❌'}</TableCell>
                                    <TableCell align="center">{row.isDelivered ? '✅' : '❌'}</TableCell>
                                    <TableCell align="center"><Button onClick={()=>history.push(`/order/${row._id}`)} variant='contained'>DETAILS</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Container>
    )
}