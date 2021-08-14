import { Card, Typography, makeStyles, CardContent } from '@material-ui/core'
import { RatingComp } from './Rating'
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    card: {
        transition: '0.3s',
        width: '18em',
        margin: '0.5em',
        '&:hover':{
            transform: 'scale(1.02)',
        },
        '&:active': {
            boxShadow: 'none'
        }
    },
    media: {
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        height: '12em',
        maxWidth: '100%'
    },
    name: {
        height: '4.5em',
        marginTop: '1em',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.2rem'
    },
    rating: {
        height: '5em',
    },
    price: {
        height: '2em',
        fontSize: '2rem',
        color: 'black',
        fontWeight: 'bold'
    }
}));

export const Product = ({ id, name, image, price, rating, numReviews }) => {

    const classes = useStyles();

    return (
        <Card className={classes.card} >
            <Link to={`/product/${id}`}>
                <CardContent>
                    <img
                        className={classes.media}
                        src={image}
                        alt={name}
                    />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                        className={classes.name}>
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                        className={classes.rating}>
                        <RatingComp readOnly={true} numReviews={numReviews} value={rating} />
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                        className={classes.price}>
                        ${price}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
}
