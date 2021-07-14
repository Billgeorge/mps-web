import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectRoute  from "../components/ProtectRouter/ProtectRouter"
import { createBrowserHistory } from "history";


import CacheBuster from 'CacheBuster'


// pages for this product
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import DashBoard  from "views/Dashboard/DashBoard.js";
import DashBoardProvider  from "views/Dashboard/DashBoardProvider.js";
import DashboardDropSeller  from "views/Dashboard/DashboardDropSeller.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegisterLanding from "views/RegisterPage/RegisterLanding";
import CreatePassword from "views/RegisterPage/CreatePassword";
import TransactionDetail from "views/TransactionDetail/TransactionDetail";
import OrderDetail from "views/order/OrderDetail";
import TransactionDetailPublic from "views/TransactionDetail/TransactionDetailPublic";
import CreatePayment from "views/CreatePayment/CreatePayment";
import checkout from "views/Checkout/Checkout";
import CreateProduct2 from "views/Product/CreateProduct_2";
import AgreePayment from "views/CreatePayment/AgreePayment";
import ProductBoard from "views/Product/ProductBoard";
import ProductDropBoard from "views/Product/ProductDropBoard";
import PrivateProducts from "views/Product/PrivateProducts";
import ProductDetail from "views/Product/ProductDetail"
import SearchProduct from "views/Product/SearchProduct";
import EditProduct from "views/Product/EditProduct";
import EditCheckout from "views/Checkout/EditCheckout";
import RecoveryPassword from "views/RecoveryPassword/RecoveryPassword";
import WithDrawal from 'views/Withdrawal/Withdrawal';
import ThanksPage from 'views/thanks/ThankPage';
import WithdrawalDetail from 'views/Withdrawal/WithdrawalDetail';
import PaymentForm from 'views/casshin/PaymentForm';
import CreateBranch from 'views/Branch/createBranch';
import CreateInventory from 'views/inventory/CreateInventory';
import BranchBoard from 'views/Branch/BranchBoard';
import PrivateInventoryBoard from 'views/inventory/PrivateInventory';
import EditPrivateInventory from 'views/inventory/EditPrivateInventory';
import EditInventoryProduct from 'views/Product/EditInventoryProduct';


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
                <ProtectRoute path="/edit-product-inventory" component={EditInventoryProduct} />
                <ProtectRoute path="/order-detail" component={OrderDetail} />
                <ProtectRoute path="/product-drop" component={ProductDropBoard} />
                <ProtectRoute path="/edit-checkout" component={EditCheckout} />
                <ProtectRoute path="/private-product" component={PrivateProducts} />
                <ProtectRoute path="/private-inventory" component={PrivateInventoryBoard} />
                <ProtectRoute path="/edit-private-inventory" component={EditPrivateInventory} />                
                <ProtectRoute path="/create-inventory" component={CreateInventory} />
                <ProtectRoute path='/product' component={ProductBoard} />                
                <ProtectRoute path='/profile' component={ProfilePage} />
                <ProtectRoute path='/create-payment' component={CreatePayment}  />
                <ProtectRoute path='/branch' component={BranchBoard}  />
                <ProtectRoute path='/create-product' component={CreateProduct2}  />                
                <ProtectRoute path='/transaction-detail' component={TransactionDetail} />           
                <ProtectRoute path='/dashboard' component={DashBoard} />
                <ProtectRoute path='/dashboard-dropprovider' component={DashBoardProvider} />
                <ProtectRoute path='/dashboard-dropseller' component={DashboardDropSeller} />
                <ProtectRoute path='/withdrawal' component={WithDrawal} />
                <ProtectRoute path='/withdrawal-detail' component={WithdrawalDetail} />
                <ProtectRoute path="/search-product" component={SearchProduct} />
                <ProtectRoute path="/edit-product" component={EditProduct} />
                <ProtectRoute path="/create-branch" component={CreateBranch} />                
                <Route path="/detail" component={TransactionDetailPublic} />
                <Route path='/methods' component={PaymentForm} />
                <Route path="/recovery-pass" component={RecoveryPassword} />
                <Route path="/user/password" component={CreatePassword} />
                <Route path='/agree-payment' component={AgreePayment} />  
                <Route path="/registro" component={RegisterLanding} />
                <Route path="/thanks-page" component={ThanksPage} />   
                <Route path="/registro" component={RegisterLanding} />   
                <Route path="/login" component={LoginPage} />
                <Route path="/thanks-page" component={ThanksPage} />
                <Route path="/checkout" component={checkout} /> 
                
                
            </Switch>
          </Router>

          );

        }}
        </CacheBuster>
      );
}
  

export default App;