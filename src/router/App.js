import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ProtectRoute  from "../components/ProtectRouter/ProtectRouter"
import { createBrowserHistory } from "history";


// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import Checkout from "views/Checkout/Checkout.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import DashBoard  from "views/Dashboard/DashBoard.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterPage from "views/RegisterPage/RegisterPage";
import TransactionDetail from "views/TransactionDetail/TransactionDetail";
import TransactionDetailPublic from "views/TransactionDetail/TransactionDetailPublic";
import CreatePayment from "views/CreatePayment/CreatePayment";
import AgreePayment from "views/CreatePayment/AgreePayment";
import TermsCondition from "views/TermsConditions/TermsConditions";
import LandingCheckout from "views/LandingCheckout/LandingCheckout";



var hist = createBrowserHistory();

function App() {
   
  
//<Route path="/dashboard" component={dashboard} />
  return (
    
    <Router history={hist}>      
    <Switch>
        <ProtectRoute path='/profile-page' component={ProfilePage} />      
        <ProtectRoute path='/create-payment' component={CreatePayment}  />                
        <ProtectRoute path='/transaction-detail' component={TransactionDetail} />           
        <ProtectRoute path='/dashboard' component={DashBoard} />
        <Route path="/detail" component={TransactionDetailPublic} />
        <Route path='/agree-payment' component={AgreePayment} />  
        <Route path="/registro" component={RegisterPage} />   
        <Route path="/login" component={LoginPage} /> 
        <Route path="/terms" component={TermsCondition} />
        <Route path="/checkout" component={LandingCheckout} />
        <Route path="/" component={LandingPage} />      
    </Switch>
  </Router>

  );
}

export default App;