import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { Header } from './Components/Header'
import { Footer } from './Components/Footer'
import { makeStyles } from '@material-ui/core/styles'
import { MainScreen } from './Screens/MainScreen'
import { LoginScreen } from './Screens/LoginScreen'
import { CartScreen } from './Screens/CartScreen'
import { ProductScreen } from './Screens/ProductScreen'

const useStyles = makeStyles((theme) => ({
  back: {
    backgroundColor: 'rgb(52,52,52)',
    minHeight: '100vh'
  },
  wrapper: {
    backgroundColor: 'white',
    minHeight: '100vh'
  },
  main: {
    minHeight: '80vh',
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <CssBaseline>
        <Container className={classes.back} maxWidth={false}>
          <Container className={classes.wrapper} maxWidth='lg' disableGutters={true}>
            <Header />
            <main className={classes.main}>
              <Route exact path='/' component={MainScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/cart' component={CartScreen} />
              <Route path='/product/:id' component={ProductScreen} />
            </main>
            <Footer />
          </Container>
        </Container>
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;
