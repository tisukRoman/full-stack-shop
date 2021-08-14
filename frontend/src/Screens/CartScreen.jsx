import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { SelectQty } from '../components/SelectQty'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: 'grey'
    },
    itemsBlock: {
        width: '70%',
        padding: '2em',
    },
    infoBlock: {
        padding: '2em',
        width: '30%',
    },
    cartItem: {
        marginTop: '2em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        borderBottom: '1px solid grey',
    },
    imgWrap: {
        width: '10em',
        height: '10em',
        overflow: 'hidden',
    },
    img: {
        objectFit: 'cover',
        width: '10em',
        height: '10em',
        padding: '0.05px',
    },
    nameWrap: {
        width: '15em',
        padding: '2.1em 2em'
    },
    priceWrap: {
        width: '10em',
        padding: '2.1em',
    },
    boldText: {
        fontWeight: 'bold',
    },
    selectWrap: {
        width: '10em',
    },
    deleteButtonWrap: {
        width: '10em',
        padding: '2em',
    },
    deleteButton: {
        width: '80%',
    },
    totalPriceWrap: {
        padding: '1em',
        border: '1px solid grey'
    },
    checkButtonWrap: {
        padding: '1em',
        border: '1px solid grey'
    },
    checkButton: {
        transition: '0.3s',
        width: '100%',
        backgroundColor: 'black',
        color: 'white',
        lineHeight: '2em',
        '&:hover': {
            backgroundColor: 'black',
            color: 'yellow',
        }
    },
    totalCount: {
        fontSize: '1.2rem',
        lineHeight: '1.5em',
        fontWeight: 'bold',
        color: 'grey',
        marginBottom: '0.5em'
    }
}));

export const CartScreen = ({ match, location, history }) => {
    const classes = useStyles();
    const productId = match.params.id;
    const qty = location.search ? Number(location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalCost = cartItems.reduce((acc, el) => {
        return acc += el.price * el.qty;
    }, 0).toFixed(2);
    const totalCount = cartItems.reduce((acc, el) => {
        return acc += el.qty;
    }, 0);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);

    const removeHandler = (id) => { // REMOVES ITEM FROM CART
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        // if is logged redirects to shipping
        history.push('/login?redirect=shipping');
    }

    return (
        <Container maxWidth={'lg'} className={classes.wrapper}>
            <div className={classes.itemsBlock}>
                <Typography component='h4' className={classes.title}>SHOPPING CART</Typography>
                <div >
                    {cartItems?.map(p => (
                        <div className={classes.cartItem} key={p.product}>
                            <div className={classes.imgWrap}>
                                <img className={classes.img} src={p.image} alt={p.name} />
                            </div>
                            <div className={classes.nameWrap}>
                                <Typography component='p' className={classes.boldText}>{p.name}</Typography>
                            </div>
                            <div className={classes.priceWrap}>
                                <Typography component='p' className={classes.boldText}>${p.price}</Typography>
                            </div>
                            <div className={classes.selectWrap}>
                                <SelectQty _id={p.product} qty={p.qty} countInStock={p.countInStock} />
                            </div>
                            <div className={classes.deleteButtonWrap}>
                                <Button
                                    onClick={() => removeHandler(p.product)}
                                    variant={'contained'}
                                    className={classes.deleteButton}><DeleteIcon /></Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={classes.infoBlock}>
                <div className={classes.totalPriceWrap}>
                    <Typography className={classes.totalCount} component='p'>SUBTOTAL ({totalCount}) ITEMS</Typography>
                    <Typography className={classes.boldText} component='p'>${totalCost}</Typography>
                </div>
                <div className={classes.checkButtonWrap}>
                    <Button
                        onClick={checkoutHandler}
                        disabled={!cartItems.length}
                        variant={'outlined'}
                        className={classes.checkButton}
                    >PROCEED TO CHECKOUT</Button>
                </div>
            </div>

        </Container>)
}
