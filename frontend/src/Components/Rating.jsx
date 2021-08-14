import React from 'react'
import { Rating } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

export const RatingComp = ({ value, numReviews, readOnly, onChange }) => {
    return (
        <>
            <Rating onChange={onChange} value={value} readOnly={readOnly} />
            {(numReviews || numReviews===0) && <Typography >{numReviews} reviews</Typography>}
        </>

    )
}
