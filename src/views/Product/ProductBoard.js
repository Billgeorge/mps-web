import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Checkbox from '@material-ui/core/Checkbox';

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
import {getLegibleDate} from 'util/DateUtil'

import {consumeServiceGet} from 'service/ConsumeService'
import {CORE_BASEURL} from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import consumeServicePost from '../../service/ConsumeService'

const useStyles = makeStyles(styles);


  
  export default function ProductBoard(props) {

    const [withdrawal, setWithdrawal] = React.useState([]);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [amount, setAmount] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");    

    React.useEffect(() => getWithdrawalsForMerchant(), []);    

    const callBackSuccess = (withdrawals) =>{
        setWithdrawal(withdrawals)      
    }

    const copyUrl = (id) => {
      var getUrl = window.location;
      var baseUrl = getUrl .protocol + "//" + getUrl.host + "/";
      navigator.clipboard.writeText(baseUrl+"agree-payment/"+id);
    }

    const callBackSuccessCreate = (withdrawals) =>{
        setSuccessMessage("Tu solicitud de retiro fue creada. En 2 días hábiles tus fondos serán transferidos a tu cuenta bancaria.")    
    }
    
    const callBackSuccessAmount = (amount) =>{
        setAmount(amount)
        if(amount!=null && amount>6000){
            setIsEnabled(true)
        }      
    }

    const requestWithdrawal = () =>{
        const merchantId = getMerchantId()
        consumeServicePost({    
            idMerchant: merchantId,
            amount: amount
          },callBack,callBackSuccessCreate,
          CORE_BASEURL+"/withdrawal")
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    const callBack = (msg) => {
      setWithdrawal([])
      if(msg==404){
        setErrorMessage("No hay retiros para mostrar")        
      }else{
        setErrorMessage("Error Cargando retiros")
      }      
    }

    const getWithdrawalsForMerchant = (filter,value) => {
      const merchantId = getMerchantId()
      console.log('getting withdrawals ')
      let url=`${CORE_BASEURL}/withdrawal/merchant/${merchantId}`
      consumeServiceGet(callBack,callBackSuccess,url)
      consumeServiceGet(callBack,callBackSuccessAmount,`${CORE_BASEURL}/payment/merchant/closed/${merchantId}`)
    }
      
    const classes = useStyles();
    const { ...rest } = props;    
  
    return (
        <div>       
       
        <ResponsiveDrawe />       
        <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >
         <GridItem xs={12} sm={12} md={12} className={classes.grid}>           
                <Grid container className={classes.box} spacing={3}>
                <Grid item  xs={12}><h2>Productos</h2></Grid>
                <GridItem xs={12} sm={12} md={12} className={classes.grid}>        
                    <Grid container className={classes.box}  spacing={3}>               
                        <Grid item xs={12} sm={12} md={12} >
                            A continuación ves los productos que has creado, cada producto siempre tendrá la misma url.                     
                        </Grid>                              
                    </Grid>
                </GridItem>   
                   <Grid item xs={12}><Button style={{marginLeft:"10px"}} color="primary" disabled={!isEnabled} onClick={requestWithdrawal}> Crear Producto</Button><Button  style={{marginLeft:"10px"}} color="primary" disabled={!isEnabled} onClick={requestWithdrawal}> Eliminar seleccionados</Button></Grid>                   
                   <Grid item xs={12} >
                   <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="center">Descripción</TableCell>
                          <TableCell align="center">Valor</TableCell> 
                          <TableCell align="center">Url</TableCell>                         
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {withdrawal.map((row) => (
                          <TableRow key={row.name}>
                            <TableCell align="center">
                                <center>
                                    <Checkbox                                  
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                  />
                                </center>
                            </TableCell>
                            <TableCell align="center"><a target="_blank" href={`/withdrawal-detail/${row.id}`} style={{cursor:"pointer"}}>{row.description}</a></TableCell>
                            <TableCell align="center">{
                              getLegibleDate(row.amount)
                            }</TableCell>
                            <TableCell align="right"><center><Button onClick={() => copyUrl(row.publicId)} color="primary">Copiar Enlace</Button></center></TableCell>
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
          {successMessage != ""
                  ?
                  <Alert severity="success">{successMessage}</Alert>
                  : <span>	&nbsp;</span>   
          }      
        </GridContainer>
        </div>
        <Footer />
      </div>
      
      
      
    );
  }