import React, { useState, useEffect } from 'react'
import { Typography, Button, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PersonIcon from '@material-ui/icons/Person'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UserMenu } from './UserMenu'
import { logout } from '../actions/userActions'
import { SearchBox } from './SearchBox'


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
    button: {
        color: 'white',
        margin: '0 1em 0 1em',
    },
}));


export const Header = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userLogin.userInfo);

    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (userInfo) {
            setUserName(userInfo.name)
            setIsAdmin(userInfo.isAdmin)
        }
    }, [userInfo])

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Toolbar component='nav' className={classes.toolbar} >
                <Link to='/' >
                    <Typography variant='h6' color='textPrimary' className={classes.title}>FULL-STACK SHOP $</Typography>
                </Link>
                <SearchBox />
                <Link to='/cart' >
                    <Button component='div' className={classes.button} startIcon={<ShoppingCartIcon />}>Cart</Button>
                </Link>
                {userInfo ? (<UserMenu isAdmin={isAdmin} userName={userName} logoutHandler={logoutHandler} />)
                    : (<Link to='/login' >
                        <Button component='div' className={classes.button} startIcon={<PersonIcon />}>Login</Button>
                    </Link>)
                }
            </Toolbar >
        </header >
    )
}
