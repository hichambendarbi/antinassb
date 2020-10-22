import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Navbar from './components/static/Layout_Navbar/Navbar';
import Home from './components/static/Layout_home/Home';
import  setAuthToken  from './utils/setAuthToken';
import { loadUser } from './controlers/auth';
import Routes from './components/routing/Routes';
// Globale style
import './App.css';
// Redux Imports
import { Provider } from 'react-redux';
import store from './store';
import Alert from './components/static/Layout_Alert/Alert';
import Footer from './components/static/Footer';
import Administration from './components/static/admin/Administration';
import AdminRoute from './components/routing/AdminRoute';
// Check if token exist in localStorage && if not exist  
if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => { 

  useEffect(() => {
    store.dispatch(loadUser());
  })


  const AdministrationContainer = () => (
    <Fragment>
      <Router>
        <Switch>
            <AdminRoute exact path="/" render={() => <Redirect to="/administration" />} />
            <AdminRoute path="/administration" component={Administration} />
        </Switch>
      </Router>
    </Fragment>
  )

  const DefaultContainer = () => (
    <Fragment>
        <Navbar/>
        <Alert/>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route component={Routes}/>
        </Switch>
        <Footer/>    
    </Fragment>
  )
 
  return ( 
    <Provider store={store}>
      <Router>
       <Switch>
       <AdminRoute exact path="/(administration)" component={AdministrationContainer} /> 
       <Route component={DefaultContainer} />
       </Switch> 
      </Router>
    </Provider>
  );
} 

export default App;

