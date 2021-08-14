import React, { useState, useEffect } from 'react'
import { Container, TextField, makeStyles, Button, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingData } from '../actions/cartActions'
import { Error } from '../components/Error'
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
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputWrap: {
        marginTop: '2em',
        width: '100%',
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
        margin: '1em 0 3em 0', 
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: 'grey'
    },
}));


export const ShippingScreen = ({ history }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const shippingInfo = useSelector(state => state.cart.shippingInfo);

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [warning, setWarning] = useState('');

    useEffect(() => {
        if (shippingInfo) {
            setAddress(shippingInfo.address);
            setCity(shippingInfo.city);
            setPostalCode(shippingInfo.postalCode);
            setCountry(shippingInfo.country);
        }
    }, [shippingInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        if (!address || !city || !postalCode || !country) {
            setWarning('All fields are required');
        }
        dispatch(saveShippingData({
            address,
            city,
            postalCode,
            country
        }))
        history.push('/payment')
    }


    return (
        <>
            <Container maxWidth='sm' className={classes.root}>
                {warning && <Error error={warning} />}
                <Link to='/cart'>
                    <Typography className={classes.backBtn} component='h4'>
                        Go Back
                    </Typography>
                </Link>
                <h3 className={classes.title}>SHIPPING</h3>
                <form onSubmit={submitHandler}>
                    <div className={classes.inputWrap}>
                        <TextField
                            type='text'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            fullWidth
                            id="address"
                            label="Address"
                            variant="outlined"
                            placeholder="Enter address..." />
                    </div>
                    <div className={classes.inputWrap}>
                        <TextField
                            type='text'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            fullWidth
                            id="city"
                            label="City"
                            variant="outlined"
                            placeholder="Enter city..." />
                    </div>
                    <div className={classes.inputWrap}>
                        <TextField
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                            fullWidth
                            id="postalCode"
                            label="Postal Code"
                            type="text"
                            variant="outlined"
                            placeholder="Enter postal code..." />
                    </div>
                    <div className={classes.inputWrap}>
                        <TextField
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            fullWidth
                            id="country"
                            label="Country"
                            type="text"
                            variant="outlined"
                            placeholder="Enter country..." />
                    </div>
                    <div className={classes.buttonWrap}>
                        <Button
                            type='submit'
                            className={classes.button}
                            variant='contained'>CONTINUE</Button>
                    </div>
                </form>
            </Container>
        </>

    )
}