import { Button, Container, makeStyles, Typography, CircularProgress, Backdrop } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { RatingComp } from '../Components/Rating'
import axios from 'axios'
import { useEffect, useState } from 'react'


const useStyles = makeStyles((theme) => ({
    wrapper: {
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
        width: '120%',
        height: '30em',
        overflow: 'hidden'
    },
    img: {
        objectFit: 'cover',
        width: '30em',
        height: '30em',
        padding: '0.05px',
    },
    descriptionBlock: {
        width: '40em',
        marginRight: 'auto'
    },
    buyBlock: {
        width: '40em',
    },
    name: {
        padding: '0 1em',
        height: '4em',
        marginTop: '1em',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    rating: {
        padding: '1em',
        height: '5em',
    },
    price: {
        padding: '0.5em',
        height: '2em',
        fontSize: '2rem',
        color: 'black',
        fontWeight: 'bold'
    },
    description: {
        padding: '1em'
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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

}));

export const ProductScreen = ({ match }) => {

    const classes = useStyles();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)
            setProduct(data)
        }
        getProduct()
    }, [match])


    if (!product) {
        return <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color="inherit" />
        </Backdrop>
    }
    return (
        <Container maxWidth='md' >
            <Link to='/'>
                <Typography className={classes.backBtn} component='h4'>
                    Go Back
                </Typography>
            </Link>
            <Container maxWidth='md' className={classes.wrapper}>

                <div className={classes.imgWrap}>
                    <img className={classes.img} src={product.image} alt={product.name} />
                </div>

                <div className={classes.descriptionBlock}>
                    <Typography className={classes.name} component='div'>
                        {product.name}
                    </Typography>
                    <Typography className={classes.rating} component='div'>
                        <RatingComp value={product.rating} numReviews={product.numReviews} />
                    </Typography>
                    <Typography className={classes.price} component='div'>
                        ${product.price}
                    </Typography>
                    <Typography className={classes.description} component='p'>
                        {product.description}
                    </Typography>
                </div>

                <div className={classes.buyBlock}>
                    <div className={classes.row}>
                        <div className={classes.buyBlockTitle}>Price:</div>
                        <div>${product.price}</div>
                    </div>
                    <div className={classes.row}>
                        <div className={classes.buyBlockTitle}>Status:</div>
                        <div>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</div>
                    </div>
                    <div className={classes.row}>
                        <Button disabled={!product.countInStock} component='button' color='primary' variant='outlined' className={classes.addBtn}>ADD TO CART</Button>
                    </div>

                </div>

            </Container>
        </Container>
    )
}
