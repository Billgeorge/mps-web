import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Alert from '@material-ui/lab/Alert';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Footer from "components/Footer/Footer.js";
import { getMerchantId,getMerchantName } from 'service/AuthenticationService';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {getLegibleDate} from 'util/DateUtil'

import {consumeServiceGet} from 'service/ConsumeService'
import {CORE_BASEURL, getOrderState} from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"




const useStyles = makeStyles(styles);


  
  export default function DashboardDropSeller(props) {

    const [products, setProducts] = React.useState({
       orders:[],
       totalOrderAmountByStatus:0,
       totalProfitSaleByStatus:0,
       totalOrderByStatus:0
    });   
    const [errorMessage, setErrorMessage] = React.useState("");    

    React.useEffect(() => getProductsForMerchant(), []);    

    const [duration, setDuration] = React.useState(15);

    const [orderState, setOrderState] = React.useState(0);

    const handleChangeDuration = (event) => {     
      setErrorMessage("")
      setDuration(event.target.value);
      getProductsForMerchant('duration', event.target.value)
    };

    const handleChangeOrderState = (event) => {     
      setErrorMessage("")
      setOrderState(event.target.value);
      getProductsForMerchant('orderState',event.target.value)
    };

    const callBackSuccess = (products) =>{
      setProducts(products)      
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })

    const callBack = (msg) => {
      setProducts({
        orders:[],
        totalOrderAmountByStatus:0,
        totalProfitSaleByStatus:0,
        totalOrderByStatus:0
     })
      if(msg===404){
        setErrorMessage("No hay transacciones para mostrar")        
      }else{
        setErrorMessage("Error Cargando Transacciones")
      }      
    }

    const getProductsForMerchant = (filter,value) => {
      const merchantId = getMerchantId()
      console.log('filter '+filter)
      console.log('value '+value)
      let url=`${CORE_BASEURL}/order/dropseller?merchantId=${merchantId}`
      if(filter ==='duration'){
        url=`${url}&durationInDays=${value}`
        if(orderState!==0){
          url=`${url}&orderState=${orderState}`
        }
      }else{
        url=`${url}&durationInDays=${duration}`
      }
      if(filter === 'orderState' && value!==-1){
        url=`${url}&orderState=${value}`
      }

      consumeServiceGet(callBack,callBackSuccess,url)
    }
      
    const classes = useStyles();
      
  
    return (
        <div>       
       <ResponsiveDrawe />   
            
        <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >
        | <GridItem xs={12} sm={12} md={12} className={classes.grid}>        
            <Grid container className={classes.box}  spacing={3}>               
                <Grid item xs={12} sm={12} md={6} >
                    Hola {getMerchantName()}, Bienvenido a MiPagoSeguro.
                </Grid>             
            </Grid>
         </GridItem>
         <GridItem xs={12} sm={12} md={12} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
                <Grid item xs={12} sm={12} md={12}>Filtrar Transacciones:</Grid>
                    <Grid item xs={12} sm={12} md={6} style={{textAlign:"center"}}>
                      <FormControl variant="outlined" style ={{width:"180px"}}>
                        <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="estado"
                          value={orderState}
                          onChange={handleChangeOrderState}
                          label="Estado"
                        >
                          <MenuItem value={-1}>
                            <em>Ninguno</em>
                          </MenuItem>
                          <MenuItem value={1}>Fallido</MenuItem>
                          <MenuItem value={2}>En despacho</MenuItem>
                          <MenuItem value={3}>En entrega</MenuItem>
                          <MenuItem value={4}>Pago pendiente</MenuItem>
                          <MenuItem value={5}>Transferido</MenuItem>
                          <MenuItem value={6}>Entregado</MenuItem>
                          <MenuItem value={7}>Devolucion</MenuItem>                                                 
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} style={{textAlign:"center"}} >
                      <FormControl variant="outlined" style={{width:"180px"}}>
                          <InputLabel id="demo-simple-select-outlined-label">Tiempo</InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={duration}
                            onChange={handleChangeDuration}
                            label="Tiempo"
                          >
                            <MenuItem value={0}>
                              <em>Ninguno</em>
                            </MenuItem>
                            <MenuItem value={10}>últimos 10 días</MenuItem>
                            <MenuItem value={20}>últimos 20 días</MenuItem>
                            <MenuItem value={30}>últimos 30 días</MenuItem>
                            <MenuItem value={60}>últimos 60 días</MenuItem>
                          </Select>
                      </FormControl>
                    </Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
        <Grid item ><span>Total monto órdenes {orderState!=0 && orderState!=-1?getOrderState(orderState)+'s':''}:</span> <br/><span className={classes.valueText}>{formatter.format(products.totalOrderAmountByStatus)}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
        <Grid item ><span>Total utilidad bruta {orderState!=0 && orderState!=-1?getOrderState(orderState)+'s':''}:</span> <br/><span className={classes.valueText}>{formatter.format(products.totalProfitSaleByStatus)}</span></Grid>
                </Grid>   
         </GridItem>   
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
        <Grid item ><span>Número de órdenes:</span> <br/><span className={classes.valueText}>{products.totalOrderByStatus}</span></Grid>
                </Grid>   
         </GridItem> 
         <GridItem xs={12} sm={12} md={12} className={classes.grid}>           
                <Grid container className={classes.box} spacing={3}>
                <Grid item  xs={12}><h2>Últimos Pagos</h2></Grid>                   
                   <Grid item xs={12} >
                   <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Producto </TableCell>
                          <TableCell align="right">Nombre Cliente </TableCell>
                          <TableCell align="right">Precio de venta</TableCell>
                          <TableCell align="center">Precio de compra</TableCell>
                          <TableCell align="center">Precio de flete</TableCell>
                          <TableCell align="center">Utilidad por venta</TableCell>
                          <TableCell align="right">Estado</TableCell>
                          <TableCell align="right">Guía</TableCell>                          
                          <TableCell align="right">Fecha de creación</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.orders.map((row) => (
                          <TableRow>
                            <TableCell component="th" scope="row">
                              <a target="_blank" href={`/order-detail/${row.orderId}`} style={{cursor:"pointer"}}>{row.productName}</a>
                            </TableCell>
                            <TableCell align="right">{row.customerName}</TableCell>
                            <TableCell align="right">{formatter.format(row.sellPrice)}</TableCell>
                            <TableCell align="right">{formatter.format(row.buyPrice)}</TableCell>
                            <TableCell align="right">{formatter.format(row.freightPrice)}</TableCell>
                            <TableCell align="right">{formatter.format(row.profitSale)}</TableCell>
                            <TableCell align="right">{getOrderState(row.orderState)}</TableCell>
                            <TableCell align="right">{row.guideNumber}</TableCell>
                            <TableCell align="right">{
                              getLegibleDate(row.creationDate)
                            }</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                   </Grid>
                </Grid>   
         </GridItem>
         {errorMessage != ""
                  ?
                  <Alert severity="error">{errorMessage}</Alert>
                  : <span>	&nbsp;</span>   
          }      
        </GridContainer>
        </div>
        <Footer />
      </div>
      
      
      
    );
  }