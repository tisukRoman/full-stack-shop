import React, { useState, useEffect } from 'react'
import { Container, FormControlLabel, makeStyles, Button, FormLabel, FormControl, RadioGroup, Radio, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentData } from '../actions/cartActions'
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2em',
    },
    title: {
        marginTop: '1em',
        fontSize: '2rem',
        fontWeight: '400',
    },
    label: {
        margin: '2em 0 1em 0',
    },
    buttonWrap: {
        marginTop: '2em',
        width: '35%',
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
    backBtn: {
        margin: '1em 0 4em 0', 
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'grey'
    },
}));


export const PaymentScreen = ({ history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const { shippingInfo, paymentInfo } = cart

    const [payMethod, setPayMethod] = useState('PayPal');

    useEffect(() => {
        if (!shippingInfo) {
            history.push('/shipping')
            return
        }
        setPayMethod(paymentInfo);
    }, [shippingInfo, history, paymentInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentData(payMethod))
        history.push('/placeorder')
    }

    return (
        <>
            <Container maxWidth='sm' className={classes.root}>
                <Link to='/shipping'>
                    <Typography className={classes.backBtn} component='h4'>
                        Go Back
                    </Typography>
                </Link>
                <h3 className={classes.title}>PAYMENT METHOD</h3>
                <FormControl component="fieldset" >
                    <FormLabel className={classes.label} component="legend">Select method</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                        <FormControlLabel value="PayPal" control={<Radio />} label="PayPal or Debit card" />
                        <FormControlLabel value="Stripe" control={<Radio />} label="Stripe" />
                    </RadioGroup>
                </FormControl>
                <div className={classes.buttonWrap}>
                    <Button
                        onClick={submitHandler}
                        className={classes.button}
                        variant='contained'>CONTINUE</Button>
                </div>
            </Container>
        </>

    )
}