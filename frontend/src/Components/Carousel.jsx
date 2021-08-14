import { makeStyles, Typography, Button } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { listTopProducts } from '../actions/productActions';
import { Preloader } from './Preloader';
import { Error } from './Error';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';
import { useHistory } from 'react-router-dom';


SwiperCore.use([Autoplay]);

const useStyles = makeStyles((theme) => ({
    slider: {
        marginTop: '2em',
        width: '90%',
        backgroundColor: '#36454f',
        margin: '0 auto',
        borderRadius: '1em',
    },
    imgWrap: {
        width: '50%',
        overflow: 'hidden',
    },
    img: {
        borderRadius: '50%',
        width: '90%',
    },
    slideItem: {
        padding: '2em',
        height: '40em',
        width: '100%',
        zIndex: 2,
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    scroll: {
        width: '100%',
        margin: '0 auto',
        height: '100%'
    },
    name: {
        color: 'white',
        fontSize: '2rem'
    },
    price: {
        marginTop: '1em',
        color: 'white',
        fontSize: '1.5rem'
    },
    buttonWrap: {
        padding: '1em',
        border: '1px solid grey'
    },
    button: {
        marginTop: '2em',
        transition: '0.3s',
        width: '50%',
        backgroundColor: 'white',
        color: 'black',
        lineHeight: '2em',
        '&:hover': {
            backgroundColor: 'white',
            transform: 'scale(1.1)'
        }
    }
}));



export const Carousel = () => {

    const history = useHistory()
    const classes = useStyles();
    const dispatch = useDispatch()
    const { loading, error, products } = useSelector(state => state.productTopList)

    useEffect(() => {
        dispatch(listTopProducts());
    }, [dispatch])

    return (
        <div className={classes.slider}>
            {loading && <Preloader />}
            {error && <Error error={error} />}
            <div className={classes.scroll}>
                <Swiper
                    className={classes.slider}
                    loop={true}
                    speed={1500}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false
                    }}
                    spaceBetween={20}
                    slidesPerView={1}
                    observer={true}>

                    {products?.map(p => (
                        <SwiperSlide key={p._id}>
                            <div className={classes.slideItem}>
                                <div>
                                    <Typography className={classes.name}>{p.name}</Typography>
                                    <Typography className={classes.price}>${p.price}</Typography>
                                    <Button onClick={()=>history.push(`/product/${p._id}`)} variant="outlined" className={classes.button}>purchase</Button>
                                </div>

                                <div className={classes.imgWrap}>
                                    <img className={classes.img} src={p.image} alt={p.name} />
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>

        </div>
    )
}
