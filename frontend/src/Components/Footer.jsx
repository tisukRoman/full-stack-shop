import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: 'black',
        color: 'white',
        minHeight: '5em',
        marginTop: '5em'
    },
    text: {
        lineHeight: '5em'
    }
}));

export const Footer = () => {

    const classes = useStyles();

    return (
        <Container component='footer' className={classes.footer}>
            <Typography align='center'className={classes.text}>made by Tyschuk Roman ©</Typography>
        </Container>
    )
}
