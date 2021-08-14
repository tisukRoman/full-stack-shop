import { Button, Container, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Preloader } from '../components/Preloader'
import { useDispatch, useSelector } from 'react-redux';
import { Error } from '../components/Error';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { listProducts, deleteProduct, createProduct } from './../actions/productActions';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em',
    },
    title: {
        marginTop: '1em',
        fontSize: '2rem',
        fontWeight: '400',
    },
    createButton: {
        transition: '0.3s',
        width: '20em',
        backgroundColor: 'black',
        color: 'white',
        float: 'right',
        margin: '0 1em 2em 0',
        lineHeight: '2em',
        '&:hover': {
            backgroundColor: 'black',
            color: 'yellow',
        }
    },
}));


export const ProductsScreen = ({ history }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.productList)
    const userInfo = useSelector(state => state.userLogin.userInfo)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector(state => state.productDelete)
    const {loading: loadingCreate, success: successCreate} = useSelector(state => state.productCreate)

    useEffect(() => {
        if (!userInfo && !userInfo?.isAdmin) {
            history.push('/login')
        }
        dispatch(listProducts())
    }, [dispatch, userInfo, history, successDelete, successCreate])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteProduct(id));
        }
    }

    const createHandler = () => {
        dispatch(createProduct());
    }

    return (
        <Container className={classes.root}>
            {(error || errorDelete || loadingCreate) && <Error error={error} />}
            {(loading || loadingDelete ) && <Preloader />}
            <h3 className={classes.title}>PRODUCT LIST</h3>
            <TableContainer>
                <Button onClick={createHandler} className={classes.createButton}>+ create product</Button>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell >ID</TableCell>
                            <TableCell align="left">NAME</TableCell>
                            <TableCell align="left">PRICE</TableCell>
                            <TableCell align="left">CATEGORY</TableCell>
                            <TableCell align="left">BRAND</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" scope="row">{row._id}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.price}</TableCell>
                                <TableCell align="left">{row.category}</TableCell>
                                <TableCell align="left">{row.brand}</TableCell>
                                <TableCell align="left">
                                    <Button onClick={()=>history.push(`/admin/productedit/${row._id}`)} variant='contained' color='primary'><EditIcon /></Button>
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
