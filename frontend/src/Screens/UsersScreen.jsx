import { Button, Container, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Preloader } from '../components/Preloader'
import { getAllUsers } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux';
import { Error } from './../components/Error';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { deleteUser } from '../actions/userActions';


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


export const UsersScreen = ({ history }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { loading, error, users } = useSelector(state => state.userGetUsers);
    const userInfo = useSelector(state => state.userLogin.userInfo)
    const { success: successDelete } = useSelector(state => state.userDelete)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getAllUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, userInfo, history, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUser(id));
        }
    }

    return (
        <Container className={classes.root}>
            {error && <Error error={error} />}
            {loading && <Preloader />}
            <h3 className={classes.title}>USER LIST</h3>
            <TableContainer>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell >ID</TableCell>
                            <TableCell align="center">NAME</TableCell>
                            <TableCell align="center">EMAIL</TableCell>
                            <TableCell align="center">ADMIN</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">{row._id}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.isAdmin ? '✅' : '❌'}</TableCell>
                                <TableCell align="center">
                                    <Button onClick={() => history.push(`/admin/userdetails/${row._id}`)} variant='contained' color='primary'><EditIcon /></Button>
                                    <Button onClick={() => deleteHandler(row._id)} variant='contained' color='secondary'><DeleteIcon /></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
