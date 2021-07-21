import React from 'react'
import { Rating } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

export const RatingComp = ({ value, numReviews }) => {
    return (
        <>
            <Rating name="read-only" value={value} readOnly />
            <Typography >{numReviews} reviews</Typography>
        </>

    )
}
