import React, { useEffect, useState } from 'react'
import { Container, Typography, makeStyles, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { getOrderDetails, payOrder, setDelivered } from './../actions/orderActions'
import { Preloader } from '../components/Preloader'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        padding: '2em'
    },
    mainTitle: {
        marginTop: '1em',
        fontSize: '2rem',
        fontWeight: '600',
    },
    title: {
        marginTop: '1em',
        fontSize: '1.5rem',
        fontWeight: '400',
    },
    leftBlock: {
        width: '60%'
    },
    rightBlock: {
        width: '40%'
    },
    leftText: {
        margin: '1em 0 1em 0'
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
    },
    success: {
        backgroundColor: '#3fff00',
        padding: '1em',
        color: 'white',
        fontWeight: 'bold'
    },
    unsuccess: {
        backgroundColor: '#ff0000',
        padding: '1em',
        color: 'white',
        fontWeight: 'bold'
    },
    paypal: {
        marginTop: '5em'
    },
    setButtonWrap: {
        padding: '1em',
        border: '1px solid grey'
    },
    setButton: {
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
}))


export const OrderScreen = ({ match }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const orderId = match.params.id;
    const orderInfo = useSelector(state => state.orderDetails.orderInfo);
    const userInfo = useSelector(state => state.userLogin.userInfo)
    const { success: paySuccess, loading: payLoading } = useSelector(state => state.orderPay);
    const { success: deliverSuccess, loading: deliverLoading } = useSelector(state => state.orderDeliver)

    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!orderInfo || orderInfo._id !== orderId || paySuccess || deliverSuccess) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!orderInfo.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            }
            setSdkReady(true)
        }
    }, [dispatch, orderInfo, orderId, paySuccess, deliverSuccess])

    const successPayHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    }

    const setDeliveredHandler = () => {
        dispatch(setDelivered(orderId))
    }

    return (
        <Container className={classes.root}>
            <Container className={classes.leftBlock}>
                <div>
                    <Typography className={classes.mainTitle}>
                        {`ORDER ${orderInfo?._id?.toUpperCase()}`}
                    </Typography>
                    <Typography className={classes.title}>
                        SHIPPING
                    </Typography>

                    <Typography className={classes.leftText}>
                        {`Name: ${orderInfo?.user?.name}`}
                    </Typography>
                    <Typography className={classes.leftText}>
                        {`Email: ${orderInfo?.user?.email}`}
                    </Typography>
                    <Typography className={classes.leftText}>
                        {`Address: ${orderInfo?.shippingAddress?.address}, 
                        ${orderInfo?.shippingAddress?.city}, 
                        ${orderInfo?.shippingAddress?.postalCode}, 
                        ${orderInfo?.shippingAddress?.country}.`}
                    </Typography>
                    {orderInfo?.isDelivered
                        ? (<div className={classes.success}>IS DELIVERED</div>)
                        : (<div className={classes.unsuccess}>NOT DELIVERED</div>)}
                </div>
                <hr />
                <div>
                    <Typography className={classes.title}>
                        PAYMENT METHOD
                    </Typography>
                    <Typography className={classes.leftText}>
                        {`Method: ${orderInfo?.paymentMethod}`}
                    </Typography>
                    {orderInfo?.isPaid
                        ? (<div className={classes.success}>IS PAID</div>)
                        : (<div className={classes.unsuccess}>NOT PAID</div>)}
                </div>
                <hr />
                <div>
                    <Typography className={classes.title}>
                        ORDER ITEMS
                    </Typography>
                    <div className={classes.cartList}>
                        {orderInfo?.orderItems?.map(i => (
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
                    <Typography className={classes.rightText} component='p'>${orderInfo?.itemsPrice}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.rightText} component='div'>shipping</Typography>
                    <Typography className={classes.rightText} component='p'>${orderInfo?.shippingPrice}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.rightText} component='div'>tax</Typography>
                    <Typography className={classes.rightText} component='p'>${orderInfo?.taxPrice}</Typography>
                </div>
                <div className={classes.row}>
                    <Typography className={classes.rightText} component='div'>total</Typography>
                    <Typography className={classes.rightText} component='p'>${orderInfo?.totalPrice}</Typography>
                </div>

                {(!orderInfo?.isPaid) && <div className={classes.checkButtonWrap}>
                    {(payLoading || deliverLoading) && <Preloader />}
                    {!sdkReady
                        ? <Preloader />
                        : <PayPalButton
                            amount={orderInfo?.totalPrice}
                            onSuccess={successPayHandler}
                        />}
                </div>}
                {(userInfo?.isAdmin && orderInfo?.isPaid) &&  <div className={classes.setButtonWrap}>
                    <Button onClick={setDeliveredHandler} className={classes.setButton}>SET AS DELIVERED</Button>
                </div>
                }

            </Container>

        </Container>
    )
}
