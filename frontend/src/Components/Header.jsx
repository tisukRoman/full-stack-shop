import React from 'react'
import { Typography, Button, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        padding: '3em',
        backgroundColor: 'black',
        minHeight: '5em'
    },
    title: {
        margin: '0 1em 0 1em',
        color: 'white'
    },
    titleLink:{
        marginRight: 'auto',
    },
    button: {
        color: 'white',
        margin: '0 1em 0 1em',
    }
}));

export const Header = () => {
    const classes = useStyles();
    return (
        <header>
            <Toolbar component='nav' className={classes.toolbar} >
                <Link to='/' className={classes.titleLink}>
                    <Typography variant='h6' color='textPrimary' className={classes.title}>Full-Stack Shop</Typography>
                </Link>
                <Link to='/cart' >
                    <Button component='div' className={classes.button} startIcon={<ShoppingCartIcon />}>Cart</Button>
                </Link>
                <Link to='/login' >
                    <Button component='div' className={classes.button} startIcon={<PersonIcon />}>Login</Button>
                </Link>
            </Toolbar>
        </header>
    )
}
