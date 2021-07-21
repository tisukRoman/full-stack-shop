import React, { useState, useEffect } from 'react'
import { Product } from '../Components/Product'
import { makeStyles, Typography, Container, Backdrop, CircularProgress } from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    productList: {
        padding: '1em',
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
    productTitle: {
        padding: '2.5em',
        fontWeight: 'bold',
        color: 'grey'
    }
}));

export const MainScreen = () => {

    const classes = useStyles()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get('/api/products')
            setProducts(data)
        }
        getProducts()
    }, [])


    if (!products) {
        return <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    }
    return (<>
        <Typography variant='h5' className={classes.productTitle}>LATEST PRODUCTS</Typography>
        <Container className={classes.productList}>
            {products?.map(p => <Product
                key={p._id}
                id={p._id}
                name={p.name}
                image={p.image}
                price={p.price}
                rating={p.rating}
                numReviews={p.numReviews}
            />)}
        </Container>
    </>
    )
}
