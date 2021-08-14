import React, { useState } from 'react'
import { TextField, makeStyles, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    searchWrap: {
        margin: '0 auto 0 4em',
        border: '1px solid grey',
        backgroundColor: 'white'
    }
}))

export const SearchBox = () => {

    const classes = useStyles();
    const history = useHistory();
    const [keyword, setKeyword] = useState('');

    const searchHandler = () => {
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push(`/`)
        }
    }

    return (
        <div className={classes.searchWrap}>
            <TextField
                color="secondary"
                onChange={e => setKeyword(e.target.value)}
                value={keyword}
            />
            <Button onClick={searchHandler}>Search</Button>
        </div>
    )
}
