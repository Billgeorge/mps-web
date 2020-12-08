import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Link from "assets/img/link-button.png";
import Button from "components/CustomButtons/Button.js";

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
import {CORE_BASEURL, getPaymentState, getPaymentIdState} from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"




const useStyles = makeStyles(styles);


  
  export default function DashBoard(props) {

    const [payments, setPayments] = React.useState([]);
    const [numberPaymentPaid, setNumberPaymentPaid] = React.useState(0);
    const [amounPaymentPaid, setAmountPaymentPaid] = React.useState(0);
    const [pendingPayments, setPendingPayments] = React.useState('$ 0');
    const [errorMessage, setErrorMessage] = React.useState("");    

    React.useEffect(() => getPaymentsForMerchant(), []);    

    const [duration, setDuration] = React.useState(15);

    const [paymentState, setPaymentState] = React.useState(0);

    const handleChangeDuration = (event) => {
      setAmountPaymentPaid('$ 0')
      setPendingPayments(0)
      setNumberPaymentPaid(0)
      setErrorMessage("")
      setDuration(event.target.value);
      getPaymentsForMerchant('duration', event.target.value)
    };

    const handleChangePaymentState = (event) => {
      setAmountPaymentPaid('$ 0')
      setPendingPayments(0)
      setNumberPaymentPaid(0)
      setErrorMessage("")
      setPaymentState(event.target.value);
      getPaymentsForMerchant('paymentState',event.target.value)
    };

    const callBackSuccess = (payments) =>{
      setPayments(payments)
      calculateTotal(payments)
    }
    const copyUrl = (id) => {
      var getUrl = window.location;
      var baseUrl = getUrl .protocol + "//" + getUrl.host + "/";
      navigator.clipboard.writeText(baseUrl+"agree-payment/"+id);
    }
    const calculateTotal = (payments) => {
      let pendingPayments = 0
      let paidPayments = 0
      let valuePaidPayments = 0
      let paymentStateToCompare = 3
      let paymentStateInput = document.getElementById('estado')
      if(paymentStateInput.textContent != 'Ninguno' && paymentStateInput.textContent != "​"){
        paymentStateToCompare=getPaymentIdState(paymentStateInput.textContent)
      }
      for (var i = 0; i < payments.length; i++) {
        if(payments[i].idState == paymentStateToCompare){
          paidPayments = paidPayments +1
          valuePaidPayments = valuePaidPayments + payments[i].amount
        } else if (payments[i].idState < 3){
          pendingPayments = pendingPayments + 1
        }    
      }
      setAmountPaymentPaid(formatter.format(valuePaidPayments))
      setPendingPayments(pendingPayments)
      setNumberPaymentPaid(paidPayments)

    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    const callBack = (msg) => {
      setPayments([])
      if(msg==404){
        setErrorMessage("No hay transacciones para mostrar")        
      }else{
        setErrorMessage("Error Cargando Transacciones")
      }      
    }

    const getPaymentsForMerchant = (filter,value) => {
      const merchantId = getMerchantId()
      console.log('filter '+filter)
      console.log('value '+value)
      let url=`${CORE_BASEURL}/payment/merchant?merchantId=${merchantId}`
      if(filter =='duration'){
        url=`${url}&durationInDays=${value}`
        if(paymentState!=0){
          url=`${url}&paymentState=${paymentState}`
        }
      }else{
        url=`${url}&durationInDays=${duration}`
      }
      if(filter == 'paymentState' && value!=-1){
        url=`${url}&paymentState=${value}`
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
        | <GridItem xs={12} sm={12} md={12} className={classes.grid}>        
            <Grid container className={classes.box}  spacing={3}>               
                <Grid item xs={12} sm={12} md={6} >
                    Hola {getMerchantName()}, Bienvenido a MiPagoSeguro
                </Grid>
                <Grid container xs={12} sm={12} md={6} justify="center" alignItems="center"> 
                    
                    <Grid item  xs={4}>
                    <a>
                    <div className={classes.boxItem} style={{margin:"10px"}}>
                      <a href="/create-payment">
                        <img src={Link} className={classes.imgLink} />
                        <span className={classes.textButton}>Crear enlace de pago</span>
                      </a>
                    </div>
                    </a>
                    </Grid>
                    
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
                          value={paymentState}
                          onChange={handleChangePaymentState}
                          label="Estado"
                        >
                          <MenuItem value={-1}>
                            <em>Ninguno</em>
                          </MenuItem>
                          <MenuItem value={1}>Creado</MenuItem>
                          <MenuItem value={2}>Acordado</MenuItem>
                          <MenuItem value={3}>Pagado</MenuItem>
                          <MenuItem value={4}>Despachado</MenuItem>
                          <MenuItem value={5}>Disputa</MenuItem>
                          <MenuItem value={6}>Cerrado</MenuItem>
                          <MenuItem value={7}>Recibido</MenuItem>                          
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
        <Grid item ><span>Dinero Transacciones {paymentState!=0 && paymentState!=-1?getPaymentState(paymentState)+'s':'pagadas'}:</span> <br/><span className={classes.valueText}>{amounPaymentPaid}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
        <Grid item ><span>Transacciones {paymentState!=0 && paymentState!=-1?getPaymentState(paymentState)+'s':'pagadas'}:</span> <br/><span className={classes.valueText}>{numberPaymentPaid}</span></Grid>
                </Grid>   
         </GridItem>   
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
        <Grid item ><span>Transacciones Pendientes:</span> <br/><span className={classes.valueText}>{pendingPayments}</span></Grid>
                </Grid>   
         </GridItem> 
         <GridItem xs={12} sm={12} md={12} className={classes.grid}>           
                <Grid container className={classes.box} spacing={3}>
                <Grid item  xs={12}><h2>Últimas Transacciones</h2></Grid>                   
                   <Grid item xs={12} >
                   <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Descripción </TableCell>
                          <TableCell align="right">Nombre Cliente </TableCell>
                          <TableCell align="right">Valor</TableCell>
                          <TableCell align="center">Enlace</TableCell>
                          <TableCell align="right">Estado</TableCell>
                          <TableCell align="right">Guía</TableCell>
                          <TableCell align="right">Transportador</TableCell>
                          <TableCell align="right">Fecha de creación</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payments.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              <a target="_blank" href={`/transaction-detail/${row.id}`} style={{cursor:"pointer"}}>{row.description==null?'descrioción vacía':row.description}</a>
                            </TableCell>
                            <TableCell align="right">{row.customerName}</TableCell>
                            <TableCell align="right">{formatter.format(row.amount)}</TableCell>
                            <TableCell align="right"><Button onClick={() => copyUrl(row.id)} color="primary">Copiar Enlace</Button></TableCell>
                            <TableCell align="right">{getPaymentState(row.idState)}</TableCell>
                            <TableCell align="right">{row.guideNumber}</TableCell>
                            <TableCell align="right">{row.transportCompany}</TableCell>
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
        <Footer whiteFont />
      </div>
      
      
      
    );
  }