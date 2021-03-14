import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ProtectRoute  from "../components/ProtectRouter/ProtectRouter"
import { createBrowserHistory } from "history";

import CacheBuster from 'CacheBuster'


// pages for this product
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import DashBoard  from "views/Dashboard/DashBoard.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterLanding from "views/RegisterPage/RegisterLanding";
import CreatePassword from "views/RegisterPage/CreatePassword";
import TransactionDetail from "views/TransactionDetail/TransactionDetail";
import TransactionDetailPublic from "views/TransactionDetail/TransactionDetailPublic";
import CreatePayment from "views/CreatePayment/CreatePayment";
import CreateProduct from "views/Product/CreateProduct";
import AgreePayment from "views/CreatePayment/AgreePayment";
import ProductBoard from "views/Product/ProductBoard";
import RecoveryPassword from "views/RecoveryPassword/RecoveryPassword";
import WithDrawal from 'views/Withdrawal/Withdrawal';
import ThanksPage from 'views/thanks/ThankPage';
import WithdrawalDetail from 'views/Withdrawal/WithdrawalDetail';

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
                <ProtectRoute path='/product' component={ProductBoard} />
                <ProtectRoute path='/profile' component={ProfilePage} />
                <ProtectRoute path='/create-payment' component={CreatePayment}  />
                <ProtectRoute path='/create-product' component={CreateProduct}  />                
                <ProtectRoute path='/transaction-detail' component={TransactionDetail} />           
                <ProtectRoute path='/dashboard' component={DashBoard} />
                <ProtectRoute path='/withdrawal' component={WithDrawal} />
                <ProtectRoute path='/withdrawal-detail' component={WithdrawalDetail} />
                <Route path="/detail" component={TransactionDetailPublic} />
                <Route path="/recovery-pass" component={RecoveryPassword} />
                <Route path="/user/password" component={CreatePassword} />
                <Route path='/agree-payment' component={AgreePayment} />  
                <Route path="/registro" component={RegisterLanding} />
                <Route path="/thanks-page" component={ThanksPage} />   
                <Route path="/login" component={LoginPage} /> 
            </Switch>
          </Router>

          );

        }}
        </CacheBuster>
      );
}
  

export default App;