import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ProtectRoute  from "../components/ProtectRouter/ProtectRouter"
import { createBrowserHistory } from "history";


// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import DashBoard  from "views/Dashboard/DashBoard.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterLanding from "views/RegisterPage/RegisterLanding";
import CreatePassword from "views/RegisterPage/CreatePassword";
import TransactionDetail from "views/TransactionDetail/TransactionDetail";
import TransactionDetailPublic from "views/TransactionDetail/TransactionDetailPublic";
import CreatePayment from "views/CreatePayment/CreatePayment";
import AgreePayment from "views/CreatePayment/AgreePayment";
import TermsCondition from "views/TermsConditions/TermsConditions";



var hist = createBrowserHistory();

function App() {
   
  
//<Route path="/dashboard" component={dashboard} />
  return (
    
    <Router history={hist}>      
    <Switch>
        <ProtectRoute path='/profile' component={ProfilePage} />      
        <ProtectRoute path='/create-payment' component={CreatePayment}  />                
        <ProtectRoute path='/transaction-detail' component={TransactionDetail} />           
        <ProtectRoute path='/dashboard' component={DashBoard} />
        <Route path="/detail" component={TransactionDetailPublic} />
        <Route path="/user/password" component={CreatePassword} />
        <Route path='/agree-payment' component={AgreePayment} />  
        <Route path="/registro" component={RegisterLanding} />   
        <Route path="/login" component={LoginPage} /> 
        <Route path="/terms" component={TermsCondition} />        
        <Route path="/" component={LandingPage} />      
    </Switch>
  </Router>

  );
}

export default App;