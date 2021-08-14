import React from 'react';
import { Alert } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    text: {
        color: 'red',
        fontSize: '1rem',
        lineHeight: '1em',
    }
}))

export const Error = ({ error }) => {
    const classes = useStyles();
    return (
        <Alert severity="error" className={classes.text}>
            <strong>{error}</strong>
        </Alert>
    );
}