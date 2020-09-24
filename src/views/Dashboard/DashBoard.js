require('dotenv').config()
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Link from "assets/img/link-button.png";

import HeaderLinksSession from "components/Header/HeaderLinksSession.js";
import Header from "components/Header/Header.js";
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
import { getMerchantId } from 'service/AuthenticationService';

import {consumeServiceGet} from 'service/ConsumeService'
import {CORE_BASEURL, getPaymentState} from 'constant/index'

const useStyles = makeStyles(styles);

  
  export default function DashBoard(props) {

    const [payments, setPayments] = React.useState([]);
    const [numberPaymentPaid, setNumberPaymentPaid] = React.useState(0);
    const [amounPaymentPaid, setAmountPaymentPaid] = React.useState(0);
    const [pendingPayments, setPendingPayments] = React.useState(0);
    const [errorMessage, setErrorMessage] = React.useState("");    

    React.useEffect(() => getPaymentsForMerchant(), []);

    const callBackSuccess = (payments) =>{
      setPayments(payments)
      calculateTotal(payments)
    }
    const copyUrl = (id) => {
      navigator.clipboard.writeText(process.env.BASE_URL+"agree-payment/"+id);
    }
    const calculateTotal = (payments) => {
      let pendingPayments = 0
      let paidPayments = 0
      let valuePaidPayments = 0
      for (var i = 0; i < payments.length; i++) {
        if(payments[i].idState == 3){
          paidPayments = paidPayments +1
          valuePaidPayments = valuePaidPayments + payments[i].amount
        } else if (payments[i].idState < 3){
          pendingPayments = pendingPayments + 1
        }    
      }
      setAmountPaymentPaid(valuePaidPayments)
      setPendingPayments(pendingPayments)
      setNumberPaymentPaid(paidPayments)

    }
    const callBack = (msg) => {
      if(msg==404){
        setErrorMessage("No hay transacciones para mostrar")
      }else{
        setErrorMessage("Error Cargando Transacciones")
      }      
    }

    const getPaymentsForMerchant = () => {
      const merchantId = getMerchantId()
      const url = `${CORE_BASEURL}/payment/merchant/${merchantId}`
      consumeServiceGet(callBack,callBackSuccess,url)   

    }
      
    const classes = useStyles();
    const { ...rest } = props;    
  
    return (
        <div>
        <Header
          absolute
          color="transparent"
          brand="MiPagoSeguro"
          rightLinks={<HeaderLinksSession />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
              backgroundColor:"#03a9f4",
              padding:"20px"
            /*backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"*/
          }}
        >
        <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center">
        | <GridItem xs={12} sm={12} md={12} className={classes.grid}>        
            <Grid container className={classes.box}  spacing={3}>               
                <Grid item xs={12} sm={12} md={6} >
                    Hola Tienda de pruebas, Bienvenido a MiPagoSeguro
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
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
        <Grid item ><span>Dinero Transacciones pagadas:</span> <br/><span className={classes.valueText}>{amounPaymentPaid}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.box} spacing={3}>                   
        <Grid item ><span>Transacciones pagadas:</span> <br/><span className={classes.valueText}>{numberPaymentPaid}</span></Grid>
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
                          <TableCell>Id </TableCell>
                          <TableCell align="right">Nombre Cliente </TableCell>
                          <TableCell align="right">Valor</TableCell>
                          <TableCell align="center">Enlace</TableCell>
                          <TableCell align="right">Estado</TableCell>
                          <TableCell align="right">Fecha de creación</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payments.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              <a target="_blank" href={`/transaction-detail/${row.id}`} style={{cursor:"pointer"}}>{row.id}</a>
                            </TableCell>
                            <TableCell align="right">{row.customerName}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            <TableCell align="right"><Button onClick={() => copyUrl(row.id)} color="primary">Copiar Enlace</Button></TableCell>
                            <TableCell align="right">{getPaymentState(row.idState)}</TableCell>
                            <TableCell align="right">{row.creationDate}</TableCell>
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
      </div>
      
      
    );
  }