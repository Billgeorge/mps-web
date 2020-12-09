import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ProtectRoute  from "../components/ProtectRouter/ProtectRouter"
import { createBrowserHistory } from "history";

import CacheBuster from 'CacheBuster'


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
import RecoveryPassword from "views/RecoveryPassword/RecoveryPassword";
import WithDrawal from 'views/Withdrawal/Withdrawal';

var hist = createBrowserHistory();

function App() {
   
  
//<Route path="/dashboard" component={dashboard} />
return (
  <CacheBuster>
    {({ loading, isLatestVersion, refreshCacheAndReload }) => {
      if (loading) return null;
      if (!loading && !isLatestVersion) {
        // You can decide how and when you want to force reload
        refreshCacheAndReload();
      }      
     
        return (
            
            <Router history={hist}>      
            <Switch>
                <ProtectRoute path='/profile' component={ProfilePage} />
                <ProtectRoute path='/create-payment' component={CreatePayment}  />                
                <ProtectRoute path='/transaction-detail' component={TransactionDetail} />           
                <ProtectRoute path='/dashboard' component={DashBoard} />
                <ProtectRoute path='/withdrawal' component={WithDrawal} />
                <Route path="/detail" component={TransactionDetailPublic} />
                <Route path="/recovery-pass" component={RecoveryPassword} />
                <Route path="/user/password" component={CreatePassword} />
                <Route path='/agree-payment' component={AgreePayment} />  
                <Route path="/registro" component={RegisterLanding} />   
                <Route path="/login" component={LoginPage} /> 
                <Route path="/terms" component={TermsCondition} />        
                <Route path="/" component={LandingPage} />      
            </Switch>
          </Router>

          );

        }}
        </CacheBuster>
      );
}
  

export default App;