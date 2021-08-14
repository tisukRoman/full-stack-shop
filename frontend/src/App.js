import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { makeStyles } from '@material-ui/core/styles'
import { MainScreen } from './Screens/MainScreen'
import { LoginScreen } from './Screens/LoginScreen'
import { CartScreen } from './Screens/CartScreen'
import { ProductScreen } from './Screens/ProductScreen'
import { RegisterScreen } from './Screens/RegisterScreen'
import { ProfileScreen } from './Screens/ProfileScreen'
import { ShippingScreen } from './Screens/ShippingScreen'
import { PaymentScreen } from './Screens/PaymentScreen'
import { PlaceOrderScreen } from './Screens/PlaceOrderScreen';
import { OrderScreen } from './Screens/OrderScreen';
import { UsersScreen } from './Screens/UsersScreen';
import { UserDetailsScreen } from './Screens/UserDetails';
import { ProductsScreen } from './Screens/ProductsScreen';
import { EditProductScreen } from './Screens/EditProductScreen';
import { OrdersScreen } from './Screens/OrdersScreen'


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
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/cart/:id?' component={CartScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/admin/userlist' component={UsersScreen} />
              <Route path='/admin/productlist' component={ProductsScreen} />
              <Route path='/admin/userdetails/:id' component={UserDetailsScreen} />
              <Route path='/admin/productedit/:id' component={EditProductScreen} />
              <Route path='/admin/orderlist' component={OrdersScreen} />
              <Route exact path='/search/:keyword' component={MainScreen} />
              <Route exact path='/page/:pageNumber' component={MainScreen} />
              <Route exact path='search/:keyword/page/:pageNumber' component={MainScreen} />
            </main>
            <Footer />
          </Container>
        </Container>
      </CssBaseline>
    </BrowserRouter>
  );
}

export default App;
