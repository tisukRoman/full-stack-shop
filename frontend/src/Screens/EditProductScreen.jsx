import React, { useState, useEffect } from 'react'
import { Container, TextField, makeStyles, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { Preloader } from '../components/Preloader'
import { Error } from '../components/Error'
import { listProductDetails, updateProduct } from '../actions/productActions'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em'
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


export const EditProductScreen = ({ history, match }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userLogin.userInfo);
    const { loading, error, product } = useSelector(state => state.productDetails)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.productUpdate)

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);


    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
            return
        }
        if (!product || product._id !== match.params.id) {
            dispatch(listProductDetails(match.params.id))
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCountInStock(product.countInStock);
            setCategory(product.category);
            setDescription(product.description);
        }
    }, [dispatch, history, userInfo, product, match, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault();
        history.push('/admin/productlist')
        dispatch(updateProduct(match.params.id, {
            name, price, image, brand, countInStock, category, description
        }));
    }

    const uploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
            debugger
            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data)
        } catch (err) {
            console.log(err);
        } finally {
            setUploading(false);
        }
    }


    return (
        <Container maxWidth='sm' className={classes.root}>
            {(error || errorUpdate) && <Error error={error} />}
            {(loading || loadingUpdate || uploading) && <Preloader />}
            <h3 className={classes.title}>Edit Product Details</h3>
            <form onSubmit={submitHandler}>
                <div className={classes.inputWrap}>
                    <TextField
                        value={name}
                        onChange={e => setName(e.target.value)}
                        fullWidth
                        id="name"
                        label="Product Name"
                        variant="outlined"
                        placeholder="Enter product name..." />
                </div>
                <div className={classes.inputWrap}>
                    <TextField
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        fullWidth
                        id="price"
                        label="Product Price"
                        variant="outlined"
                        placeholder="Enter product price in $..." />
                </div>
                <div className={classes.inputWrap}>
                    <TextField
                        value={image}
                        onChange={e => setImage(e.target.value)}
                        fullWidth
                        id="image"
                        label="Product Image"
                        variant="outlined"
                        placeholder="Enter product image url..." />
                </div>
                <Button
                    variant="contained"
                    component="label"
                >
                    Or Upload Image from Device
                    <input
                        type="file"
                        hidden
                        onChange={uploadHandler}
                    />
                </Button>
                <div className={classes.inputWrap}>
                    <TextField
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                        fullWidth
                        id="brand"
                        label="Product Brand"
                        variant="outlined"
                        placeholder="Enter product brand name..." />
                </div>
                <div className={classes.inputWrap}>
                    <TextField
                        value={countInStock}
                        onChange={e => setCountInStock(e.target.value)}
                        fullWidth
                        id="countInStock"
                        label="Count In Stock"
                        variant="outlined"
                        placeholder="Enter count of product..." />
                </div>
                <div className={classes.inputWrap}>
                    <TextField
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        fullWidth
                        id="category"
                        label="Product Category"
                        variant="outlined"
                        placeholder="Enter category of product..." />
                </div>
                <div className={classes.inputWrap}>
                    <TextField
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        fullWidth
                        id="description"
                        label="Product Description"
                        variant="outlined"
                        placeholder="Enter cdescription of the product..." />
                </div>
                <div className={classes.buttonWrap}>
                    <Button
                        onClick={submitHandler}
                        type='submit'
                        className={classes.button}
                        variant='contained'>UPDATE</Button>
                </div>
            </form>
        </Container >
    )
}
