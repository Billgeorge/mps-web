import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import { FileSaver } from 'file-saver';



import Alert from '@material-ui/lab/Alert';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Footer from "components/Footer/Footer.js";
import { getMerchantId, getMerchantName } from 'service/AuthenticationService';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import {getLegibleDate} from 'util/DateUtil'

import {consumeServiceGet} from 'service/ConsumeService'
import {CORE_BASEURL, getOrderState, getOrderIdState} from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"




const useStyles = makeStyles(styles);


  
  export default function DashBoard(props) {

    const [ordersProvider, setOrders] = React.useState({
      orders: [],
      totalOrderAmountByStatus: 0,
      totalProfitSaleByStatus: 0, 
      totalOrderByStatus: 0

    });    
    const [errorMessage, setErrorMessage] = React.useState("");    

    React.useEffect(() => getOrdersForProvider(), []);    

    const [duration, setDuration] = React.useState(100);

    const [orderState, setOrderState] = React.useState(0);

    const handleChangeDuration = (event) => {
      
      setErrorMessage("")
      setDuration(event.target.value);
      getOrdersForProvider('duration', event.target.value)
    };

    const downloadDeliveryInfo = (id) => {
      const url = `${CORE_BASEURL}/label/order/${id}`
      consumeServiceGet(callBackError,callBackSuccessGet,url)
    }

    const handleChangeorderState = (event) => {
      
      setErrorMessage("")
      setOrderState(event.target.value);
      getOrdersForProvider('orderState',event.target.value)
    };

    const callBackSuccessGet = (file) =>{
           const fileBlob = new Blob([file], { type: 'application/pdf' });
           console.log("download file",file)
           FileSaver.saveAs(fileBlob, "test.pdf");
    }

    const callBackSuccess = (ordersProvider) =>{
      setOrders(ordersProvider)      
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    const callBackError = () => {
      setErrorMessage("Error descargando rotulo")
    }

    const callBack = (msg) => {
      setOrders({orders: [],
        totalOrderAmountByStatus: 0,
        totalProfitSaleByStatus: 0, 
        totalOrderByStatus: 0})
      if(msg===404){
        setErrorMessage("No hay transacciones para mostrar")        
      }else{
        setErrorMessage("Error Cargando Transacciones")
      }      
    }

    const getOrdersForProvider = (filter,value) => {
      const merchantId = getMerchantId()
      console.log('filter '+filter)
      console.log('value '+value)
      let url=`${CORE_BASEURL}/order/provider?merchantId=${merchantId}`
      if(filter ==='duration'){
        url=`${url}&durationInDays=${value}`
        if(orderState!==0){
          url=`${url}&orderState=${orderState}`
        }
      }else{
        url=`${url}&durationInDays=${duration}`
      }
      if(filter == 'orderState' && value!=-1){
        url=`${url}&orderState=${value}`
      }

      consumeServiceGet(callBack,callBackSuccess,url)
    }
          
    const classes = useStyles();
    const { ...rest } = props;    
  
    return (
        <div>       
       <ResponsiveDrawe />   
            
        <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >
          
         
         <GridItem xs={12} sm={12} md={12} className={classes.grid}>
                <br/>
                <Grid container className={classes.box} spacing={3}> 
                <Grid item xs={12} sm={12} md={6} >
                    Hola {getMerchantName()}, Bienvenido a MiPagoSeguro.
                </Grid>
                <br/>                  
                <Grid item xs={12} sm={12} md={12}>Filtrar Transacciones:</Grid>
                    <Grid item xs={12} sm={12} md={6} style={{textAlign:"center"}}>
                      <FormControl variant="outlined" style ={{width:"180px"}}>
                        <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                        <Select
                          labelId="demo-simple-select-outlined-label"
                          id="estado"
                          value={orderState}
                          onChange={handleChangeorderState}
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
                            <MenuItem value={1}>1 día</MenuItem>
                            <MenuItem value={2}>2 días</MenuItem>
                            <MenuItem value={7}>1 semana</MenuItem>
                            <MenuItem value={30}>1 mes</MenuItem>
                          </Select>
                      </FormControl>
                    </Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
        <Grid item ><span>Ganancia de ordenes {orderState!=0 && orderState!=-1?getOrderState(orderState)+'s':''}: </span> <br/><span className={classes.valueText}>{formatter.format(ordersProvider.totalProfitSaleByStatus)}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
        <Grid item ><span> Número de ordenes {orderState!=0 && orderState!=-1?getOrderState(orderState)+'s':''}: </span> <br/><span className={classes.valueText}>{ordersProvider.totalOrderByStatus}</span></Grid>
                </Grid>   
         </GridItem>   
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
        <Grid item ><span>Dinero de ordenes {orderState!=0 && orderState!=-1?getOrderState(orderState)+'s':''}:</span> <br/><span className={classes.valueText}>{formatter.format(ordersProvider.totalOrderAmountByStatus)}</span></Grid>
                </Grid>   
         </GridItem> 
         <GridItem xs={12} sm={12} md={12} className={classes.grid}>           
                <Grid container className={classes.box} spacing={3}>
                <Grid item  xs={12}><h2>Ordenes</h2></Grid>           
                   <Grid item xs={12} >
                   <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>                          
                          <TableCell align="right">Nombre del Producto </TableCell>
                          <TableCell align="right">Nombre del cliente</TableCell>
                          <TableCell align="right">Precio de venta</TableCell>
                          <TableCell align="right">Estado</TableCell>
                          <TableCell align="right">Guía</TableCell>                          
                          <TableCell align="right">Fecha de creación</TableCell>
                          <TableCell align="center">Rotulo</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {ordersProvider.orders.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell align="right">{row.productName}</TableCell>                           
                            <TableCell align="right">{row.customerName}</TableCell>
                            <TableCell align="right">{formatter.format(row.sellPrice)}</TableCell>
                            <TableCell align="right">{getOrderState(row.orderState)}</TableCell>                            
                            <TableCell align="right">{row.guideNumber}</TableCell>                            
                            <TableCell align="right">{
                              getLegibleDate(row.creationDate)
                            }</TableCell>
                            <TableCell align="right"><a href={CORE_BASEURL+"/label/public/order/"+row.orderId}>Descargar Rotulo</a></TableCell>
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