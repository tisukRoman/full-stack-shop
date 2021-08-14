import { Button, Container, makeStyles, TextField, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { RatingComp } from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { createReview, listProductDetails } from '../actions/productActions'
import { Preloader } from '../components/Preloader'
import { Error } from '../components/Error'
import { SelectQty } from '../components/SelectQty'


const useStyles = makeStyles((theme) => ({
    wrapper: {
        padding: '2em 5em 0 5em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    backBtn: {
        padding: '1.5em',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'grey'
    },
    imgWrap: {
        width: '50em',
        overflow: 'hidden'
    },
    img: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
    },
    descriptionBlock: {
        width: '45em',
        marginRight: 'auto'
    },
    buyBlock: {
        width: '30em',
    },
    name: {
        paddingBottom: '1em',
        margin: '0 1em ',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        borderBottom: '1px solid grey'
    },
    rating: {
        margin: '1em',
        height: '5em',
        borderBottom: '1px solid grey'
    },
    price: {
        margin: '0 0.5em',
        height: '2em',
        fontSize: '2rem',
        color: 'black',
        fontWeight: 'bold',
        borderBottom: '1px solid grey'
    },
    description: {
        margin: '1em'
    },
    row: {
        border: '1px solid grey',
        padding: '1em',
        display: 'flex',
        justifyContent: 'space-between'
    },
    addBtn: {
        textAlign: 'center',
        margin: '0 auto'
    },

    reviewTitle: {
        padding: '1em 0',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        borderBottom: '1px solid grey',
        margin: '1em 0'
    },
    reviewItem: {
        margin: '1em 0',
        padding: '0.5em',
        width: '35em',
        border: '1px solid grey',
        borderRadius: '0.5em'
    },
    createReviewBlock: {
        width: '38em',
        borderRadius: '0.5em'
    },
    commentField: {
        width: '100%',
        marginTop: '1em',
        height: '10em'
    },
    reviewButton: {
        marginTop: '4em',
        transition: '0.3s',
        width: '60%',
        backgroundColor: 'black',
        color: 'white',
        lineHeight: '2em',
        '&:hover': {
            backgroundColor: 'black',
            color: 'yellow',
        }
    },

}));

export const ProductScreen = ({ match, history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const productId = match.params.id;

    const { product, loading, error } = useSelector(state => state.productDetails);
    const {loading: reviewLoading, error: reviewError, success: reviewSuccess} = useSelector(state => state.productReview);

    const [qty, setQty] = useState(1); // QUANTITY OF ORDERED PRODUCT
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        dispatch(listProductDetails(productId))
    }, [dispatch, productId, reviewSuccess]);

    const addToCartHandler = () => {
        history.push(`/cart/${productId}?qty=${qty}`)
    }

    const reviewHandler = () => {
        dispatch(createReview(productId, { rating, comment }))
    }

    return <>
        <Container>
            {(error) && <Error error={error} />}
            {(loading || !product || reviewLoading) && <Preloader />}
            <Link to='/'>
                <Typography className={classes.backBtn} component='h4'>
                    Go Back
                </Typography>
            </Link>
            <div className={classes.wrapper}>

                <div className={classes.imgWrap}>
                    <img className={classes.img} src={product?.image} alt={product?.name} />
                </div>

                <div className={classes.descriptionBlock}>
                    <Typography className={classes.name} component='div'>
                        {product?.name}
                    </Typography>
                    <Typography className={classes.rating} component='div'>
                        <RatingComp readOnly={true} value={product?.rating} numReviews={product?.numReviews} />
                    </Typography>
                    <Typography className={classes.price} component='div'>
                        ${product?.price}
                    </Typography>
                    <Typography className={classes.description} component='p'>
                        {product?.description}
                    </Typography>
                </div>

                <div className={classes.buyBlock}>
                    <div className={classes.row}>
                        <div className={classes.buyBlockTitle}>Price:</div>
                        <div>${product?.price}</div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.buyBlockTitle}>Status:</div>
                        <div>{product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                    </div>
                    {product?.countInStock ? (<div className={classes.row}>
                        <SelectQty countInStock={product?.countInStock} qty={qty} handleChange={(e) => setQty(e.target.value)} />
                    </div>) : ''}
                    <div className={classes.row}>
                        <Button
                            onClick={addToCartHandler}
                            disabled={!product?.countInStock}
                            component='button'
                            color='primary'
                            variant='outlined'
                            className={classes.addBtn}>ADD TO CART</Button>
                    </div>

                </div>
            </div>

            <div className={classes.wrapper}>
                <div className={classes.reviewBlock} component='div'>
                    <Typography className={classes.reviewTitle}>
                        Reviews
                    </Typography>
                    <div>
                        {!product?.reviews.length && "no reviews yet..."}
                        {product?.reviews.map(r => (
                            <div className={classes.reviewItem}>
                                <Typography gutterBottom={true}>
                                    <b>{r.name}</b>
                                </Typography>
                                <RatingComp value={r.rating} readOnly={true} />
                                <Typography gutterBottom={true} component='p'>
                                    {r.comment}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={classes.createReviewBlock} component='div'>
                {(reviewError) && <Error error={reviewError} />}
                    <Typography className={classes.reviewTitle}>
                        Leave your review
                    </Typography>
                    <div>
                        <RatingComp
                            onChange={(e) => setRating(e.target.value)}
                            value={rating}
                            readOnly={false} />
                    </div>
                    <TextField
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        className={classes.commentField}
                        label="Your comment"
                        placeholder="Leave your comment here..."
                        variant="outlined"
                        multiline
                        rows={8} />
                    <div className={classes.reviewButtonWrap}>
                        <Button onClick={reviewHandler} className={classes.reviewButton}>LEAVE REVIEW</Button>
                    </div>
                </div>
            </div>

        </Container>


    </>

}
