import React, { useState } from 'react'
import { Button, Menu, MenuItem, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PeopleIcon from '@material-ui/icons/People';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ListAltIcon from '@material-ui/icons/ListAlt';

const useStyles = makeStyles((theme) => ({
    button: {
        color: 'white',
    }
}));


export const UserMenu = ({ userName, logoutHandler, isAdmin }) => {
    const history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button className={classes.button} onClick={handleClick}>
                {userName}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => history.push('/profile')}>Profile_<PersonIcon /></MenuItem>
                {isAdmin && <MenuItem onClick={() => history.push('/admin/userlist')}>Users_<PeopleIcon/></MenuItem>}
                {isAdmin && <MenuItem onClick={() => history.push('/admin/orderlist')}>Orders_<ListAltIcon/></MenuItem>}
                {isAdmin && <MenuItem onClick={() => history.push('/admin/productlist')}>Products_<AllInboxIcon/></MenuItem>}
                <MenuItem onClick={logoutHandler}>Logout_<ExitToAppIcon /></MenuItem>
            </Menu>
        </div>
    )
}
