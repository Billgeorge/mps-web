import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import checkout from "views/Checkout/Checkout";
import CreateProduct from "views/Product/CreateProduct";
import AgreePayment from "views/CreatePayment/AgreePayment";
import ProductBoard from "views/Product/ProductBoard";
import ProductDropBoard from "views/Product/ProductDropBoard";
import ProductDetail from "views/Product/ProductDetail"
import SearchProduct from "views/Product/SearchProduct";
import EditProduct from "views/Product/EditProduct";
import RecoveryPassword from "views/RecoveryPassword/RecoveryPassword";
import WithDrawal from 'views/Withdrawal/Withdrawal';
import ThanksPage from 'views/thanks/ThankPage';
import WithdrawalDetail from 'views/Withdrawal/WithdrawalDetail';
import PaymentForm from 'views/casshin/PaymentForm';
import CustomizedDialogs from 'views/casshin/CustomizedDialogs';

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
                <ProtectRoute path="/productDetail" component={ProductDetail} />
                <ProtectRoute path="/product-drop" component={ProductDropBoard} />
                <ProtectRoute path='/product' component={ProductBoard} />                
                <ProtectRoute path='/profile' component={ProfilePage} />
                <ProtectRoute path='/create-payment' component={CreatePayment}  />
                <ProtectRoute path='/create-product' component={CreateProduct}  />                
                <ProtectRoute path='/transaction-detail' component={TransactionDetail} />           
                <ProtectRoute path='/dashboard' component={DashBoard} />
                <ProtectRoute path='/withdrawal' component={WithDrawal} />
                <ProtectRoute path='/withdrawal-detail' component={WithdrawalDetail} />
                <ProtectRoute path="/search-product" component={SearchProduct} />
                <ProtectRoute path="/edit-product" component={EditProduct} />
                <Route path="/detail" component={TransactionDetailPublic} />
                <Route path='/methods' component={CustomizedDialogs} />
                <Route path="/recovery-pass" component={RecoveryPassword} />
                <Route path="/user/password" component={CreatePassword} />
                <Route path='/agree-payment' component={AgreePayment} />  
                <Route path="/registro" component={RegisterLanding} />
                <Route path="/thanks-page" component={ThanksPage} />   
                <Route path="/registro" component={RegisterLanding} />   
                <Route path="/login" component={LoginPage} />
                <Route path="/thanks-page" component={ThanksPage} />
                <Route path="/paymentForm" component={PaymentForm} /> 
                <Route path="/checkout" component={checkout} /> 
            </Switch>
          </Router>

          );

        }}
        </CacheBuster>
      );
}
  

export default App;