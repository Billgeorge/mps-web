import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import {getIdFromUrl} from 'util/UrlUtil'

import Alert from '@material-ui/lab/Alert';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Footer from "components/Footer/Footer.js";

import {consumeServiceGet} from 'service/ConsumeService'
import {CORE_BASEURL} from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"


const useStyles = makeStyles(styles);


  
  export default function WithdrawalDetail(props) {

    const [payments, setPayments] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");

    const getPaymentsForWithdrawal = (filter,value) => {
      const withDrawalId = getIdFromUrl()
      console.log('getting payments per withdrawal ')
      let url=`${CORE_BASEURL}/withdrawal/payment/${withDrawalId}`
      consumeServiceGet(callBack,callBackSuccess,url)      
    }
    
    React.useEffect(() => getPaymentsForWithdrawal(), []);    

    const callBackSuccess = (payments) =>{
        setPayments(payments)      
    }    

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    const callBack = (msg) => {
      setPayments([])
      if(msg==404){
        setErrorMessage("No hay pagos para mostrar")        
      }else{
        setErrorMessage("Error Cargando pagos")
      }      
    }

    const classes = useStyles();
    const { ...rest } = props;    
  
    return (
        <div>       
       
        <ResponsiveDrawe />       
        <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >
        |
         <GridItem xs={12} sm={12} md={12} className={classes.grid}>           
                <Grid container className={classes.box} spacing={3}>
                <Grid item  xs={12}><h2>Pagos para retiro</h2></Grid>                   
                   <Grid item xs={12} >
                   <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">Descripción</TableCell>
                          <TableCell align="right">Monto</TableCell>
                          <TableCell align="right">Comisión</TableCell>                          
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {payments.map((row) => (
                          <TableRow key={row.name}>
                             <TableCell component="th" scope="row">
                              <a target="_blank" href={`/transaction-detail/${row.id}`} style={{cursor:"pointer"}}>{row.description==null?'descripción vacía':row.description}</a>
                            </TableCell>
                            <TableCell align="right">{formatter.format(row.amount)}</TableCell>                            
                            <TableCell align="right">{formatter.format(row.comision)}</TableCell>
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