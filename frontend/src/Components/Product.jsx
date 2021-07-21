import { Card, Typography, makeStyles, CardMedia, CardContent } from '@material-ui/core'
import { RatingComp } from './Rating'
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    card: {
        width: '18em',
        margin: '1em',
        '&:active': {
            transition: '0.3s',
            boxShadow: 'none'
        }
    },
    media: {
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '18em',
    },
    name: {
        height: '4em',
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
        <Card className={classes.card} raised={true}>
            <Link to={`/product/${id}`}>
                <CardContent>
                    <CardMedia
                        className={classes.media}
                        image={image}
                        title={name}
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
                        <RatingComp numReviews={numReviews} value={rating} />
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
