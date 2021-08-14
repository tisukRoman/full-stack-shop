import React, { useEffect } from 'react'
import { Container, Typography, makeStyles, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { createOrderItem } from './../actions/orderActions'
import { Error } from '../components/Error'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '2em'
    },
    title: {
        marginTop: '1em',
        fontSize: '2rem',
        fontWeight: '400',
    },
    leftBlock: {
        width: '60%'
    },
    rightBlock: {
        width: '40%'
    },
    leftText: {
        margin: '1em 0 2em 0'
    },
    cartItem: {
        marginTop: '1em',
        borderBottom: '1px solid grey',
        display: 'flex',
        alignItems: 'center',
        padding: '1em'
    },
    imgWrap: {
        width: '5em',
        height: '5em',
        overflow: 'hidden',
    },
    img: {
        objectFit: 'cover',
        width: '5em',
        height: '5em',
        padding: '0.05px',
    },
    productName: {
        width: '40%',
        marginLeft: '1em'
    },
    productCost: {
        marginLeft: '1em'
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
    row: {
        border: '1px solid grey',
        display: 'flex',
        padding: '1em'
    },
    rightText: {
        width: '50%'
    },
    summaryTitle: {
        fontSize: '1.5rem',
        fontWeight: '500',
        color: 'black'
    }
}))


export const PlaceOrderScreen = ({ history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const { error, order } = orderCreate;
    const { cartItems, shippingInfo, paymentInfo } = cart;
    const { address, city, postalCode, country } = shippingInfo;

    // calculating prices
    cart.productsCost = cartItems.reduce((acc, el) => {
        return acc += el.price * el.qty;
    }, 0).toFixed(2);
    cart.shippingCost = (cart.ProductsCost > 1500 ? 0 : 15).toFixed(2);
    cart.taxCost = ((cart.productsCost / 100) * 1).toFixed(2);
    cart.totalCost = (Number(cart.productsCost) + Number(cart.shippingCost) + Number(cart.taxCost)).toFixed(2);

    const placeOrder = () => {
        dispatch(createOrderItem({
            orderItems: cartItems,
            shippingAddress: shippingInfo,
            paymentMethod: paymentInfo,
            itemsPrice: cart.productsCost,
            taxPrice: cart.taxCost,
            shippingPrice: cart.shippingCost,
            totalPrice: cart.totalCost
        }))
    }

    useEffect(() => {
        if (order) {
            history.push(`/order/${order._id}`);
        }
        // eslint-disable-next-line 
    }, [order, history])

    return (
        <Container className={classes.root}>
            <Container className={classes.leftBlock}>
                <div>
                    <Typography className={classes.title}>
                        SHIPPING
                    </Typography>
                    <Typography className={classes.leftText}>
                        {`Address: ${address}, ${city}, ${postalCode}, ${country}.`}
                    </Typography>
                </div>
                <hr />
                <div>
                    <Typography className={classes.title}>
                        PAYMENT METHOD
                    </Typography>
                    <Typography className={classes.leftText}>
                        {`Method: ${paymentInfo}`}
                    </Typography>
                </div>
                <hr />
                <div>
                    <Typography className={classes.title}>
                        ORDER ITEMS
                    </Typography>
                    <div className={classes.cartList}>
                        {cartItems.map(i => (
                            <div className={classes.cartItem} key={i.product}>
                                <div className={classes.imgWrap}>
                                    <img src={i.image} alt={i.name} className={classes.img} />
                                </div>
                                <Typography className={classes.productName}>
                                    {i.name}
                                </Typography>
                                <Typography className={classes.productCost}>
                                    {`${i.qty} x $${i.price} = $${i.qty * i.price}`}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>

            <Container className={classes.rightBlock}>
                <div className={classes.row}>
                    <Typography className={classes.summaryTitle} component='p'>ORDER SUMMARY</Typography>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.rightText} component='div'>items</Typography>
                    <Typography className={classes.rightText} component='p'>${cart.productsCost}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.rightText} component='div'>shipping</Typography>
                    <Typography className={classes.rightText} component='p'>${cart.shippingCost}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.rightText} component='div'>tax</Typography>
                    <Typography className={classes.rightText} component='p'>${cart.taxCost}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.rightText} component='div'>total</Typography>
                    <Typography className={classes.rightText} component='p'>${cart.totalCost}</Typography>
                </div>

                <div className={classes.checkButtonWrap}>
                    <Button
                        onClick={placeOrder}
                        variant={'outlined'}
                        className={classes.checkButton}
                        disabled={!cartItems.length}
                    >PLACE ORDER</Button>
                </div>
            </Container>
            {error && <Error error={error} />}
        </Container>
    )
}
