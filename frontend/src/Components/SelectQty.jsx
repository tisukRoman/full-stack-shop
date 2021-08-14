import React, { useState } from 'react'
import { FormControl, InputLabel, Select, makeStyles, MenuItem } from '@material-ui/core'
import { addToCart } from '../actions/cartActions';
import { useDispatch } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export const SelectQty = ({ countInStock, qty, handleChange, _id }) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false); // SELECT IS OPEN
    const dispatch = useDispatch();

    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Quantity</InputLabel>
            <Select
                labelId="demo-controlled-open-select-label"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={qty}
                onChange={
                    handleChange 
                    ? handleChange 
                    : (e) => dispatch(addToCart(_id, Number(e.target.value)))}
            >
                {
                    [...Array(countInStock).keys()].map(c => (
                        <MenuItem value={c + 1} key={c + 1}>{c + 1}</MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    )
}
