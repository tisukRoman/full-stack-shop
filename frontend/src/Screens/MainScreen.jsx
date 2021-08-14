import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Product } from '../components/Product'
import { makeStyles, Typography, Container } from '@material-ui/core'
import { listProducts } from '../actions/productActions';
import { Error } from '../components/Error'
import { Preloader } from '../components/Preloader'
import { Pagination } from '@material-ui/lab';
import { Carousel } from '../components/Carousel';
import { Meta } from './../components/Meta';

const useStyles = makeStyles((theme) => ({
    productList: {
        padding: '2em',
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
    },
    productTitle: {
        padding: '2.5em',
        fontWeight: 'bold',
        color: 'grey'
    },
    error: {
        padding: '2.5em',
        fontWeight: 'bold',
        color: 'red'
    },
    pagination: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '30em',
        margin: '3em auto 0 auto',
    }
}));

export const MainScreen = ({ match, history }) => {

    const keyword = match.params.keyword;
    const currentPage = match.params.pageNumber || 1;

    const classes = useStyles();
    const dispatch = useDispatch();
    const { pageNumber, pageCount, products, loading, error } = useSelector(state => state.productList);

    const [page, setPage] = useState(pageNumber);

    useEffect(() => {
        if (!keyword?.trim()) {
            history.push(`/page/${page}`);
        }
        dispatch(listProducts(keyword, page));
    }, [dispatch, keyword, currentPage, history, page])


    return (<>
        <Meta />
        {error && <Error error={error} />}
        {(loading || !products) && <Preloader />}
        {!keyword && <Carousel />}
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

        <div className={classes.pagination}>
            <Pagination
                size="large"
                onChange={(e, v) => setPage(v)}
                count={pageCount} />
        </div>
    </>
    )
}
