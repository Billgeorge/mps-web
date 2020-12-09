import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Button from '@material-ui/core/Button';

import {CORE_BASEURL,getPaymentState} from 'constant/index'
import {consumeServiceGet,consumeServicePatch} from 'service/ConsumeService'
import {getIdFromUrl} from 'util/UrlUtil'
import Alert from '@material-ui/lab/Alert';

import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import {getLegibleDate} from 'util/DateUtil'


const useStyles = makeStyles(styles);

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
  
  export default function DashBoard(props) {

    const [payment, setPayment] = React.useState({});
    const [customer, setCustomer] = React.useState({});
    const [isSuccess, setIsSuccess] = React.useState(null);
    
      
    const classes = useStyles();
    const { ...rest } = props;

    const callBackSuccessGet = (payment) =>{
      console.log('Success get')
      payment.creationDate = getLegibleDate(payment.creationDate)
      setPayment(payment)
      if(payment.idCustomer!==null){
      const url = `${CORE_BASEURL}/payment/customer/${payment.idCustomer}`
      consumeServiceGet(callBackError,callBackSuccessGetCustomer,url)
      }
      renderForm(payment)     
    }
    const callBackSuccessGetCustomer  = (customer) =>{
      setCustomer(customer)
    }

    const callBackSuccessPatch = () =>{
      console.log('Success path')
      setIsSuccess(true)     
    }

    const callBackError = () => {
      console.log('error error in get')
      setIsSuccess(false)
    }

    
    React.useEffect(() => getPaymentData(), []);

    const getPaymentData = () => {
      setIsSuccess(null)
      const idPayment = getIdFromUrl()
      const url = `${CORE_BASEURL}/payment/${idPayment}`
      consumeServiceGet(callBackError,callBackSuccessGet,url)
    }    
    
    const updatePaymentState = (state) =>{
      const url = `${CORE_BASEURL}/payment/updateState`
      consumeServicePatch({
        paymentId:getIdFromUrl(),
        state:state,
        guideNumber: document.getElementById("guideNumber").value,
        transportCompany: document.getElementById("transporter").value
      },callBackError,callBackSuccessPatch,url)
    }
    const renderForm = (paymentIn) =>{
      if(paymentIn.idState === 3){
        document.deliveryForm.onsubmit = function(event){
          console.log(event.submitter.outerText)
          event.preventDefault()        
          console.log("Despachado")
          updatePaymentState(4)
        
        }
        let htmlInputs = document.forms["deliveryForm"].getElementsByTagName("input");
        
        for(let input of htmlInputs){
          console.log(input.item)
          input.oninvalid = function(e) {
              e.target.setCustomValidity("Este campo es obligatorio o invalido");
          }
          input.oninput = function(e) {
            e.target.setCustomValidity("");
          };
        }
      }
    }
  
    return (
        <div>
        <ResponsiveDrawe />
        <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center">
        | <GridItem xs={12} sm={12} md={12} className={classes.grid}>        
            <Grid container className={classes.box}  spacing={3}>               
                <Grid item >
                    <h3>Detalle de transacción : </h3>
                </Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.boxDetail} spacing={3}>                   
        <Grid item ><span>Descripción:</span> <br/><span className={classes.valueTextDetail}>{payment.description==null?'Descripción vacía':payment.description}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.boxDetail} spacing={3}>                   
        <Grid item ><span>Valor :</span> <br/><span className={classes.valueTextDetail}>{formatter.format(payment.amount)}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.boxDetail} spacing={3}>                   
        <Grid item ><span>Fecha Creación:</span> <br/><span className={classes.valueTextDetail}>{payment.creationDate}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Nombre del cliente:</span> <br/><span className={classes.valueTextDetail}>{typeof (customer.name)=='undefined'?'Nombre vacio':`${customer.name} ${customer.lastName}`}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Celular del cliente:</span> <br/><span className={classes.valueTextDetail}>{customer.contactNumber}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Id:</span> <br/><span className={classes.valueTextDetail}>{payment.id}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Estado:</span> <br/><span className={classes.valueTextDetail}>{getPaymentState(payment.idState)}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={8} className={classes.grid}>
         <Grid container className={classes.boxDetail, classes.deliveryForm} spacing={3}  justify="center" >                   
                   
                   { payment.idState === 3
                  ?<GridItem>
                    <form validated="true" name="deliveryForm" id="deliveryForm">
                     
                      <GridContainer>
                        <GridItem xs={6} sm={4} md={4}>
                          <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                            <InputLabel htmlFor="guideNumber">Número de Guía</InputLabel>
                            <OutlinedInput
                              id="guideNumber"
                              required
                              placeholder="Ingresa número de guia"                                 
                              labelWidth={60}
                              type="number"
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem xs={6} sm={4} md={4}>
                        <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                            <InputLabel htmlFor="transporter">Transportadora</InputLabel>
                            <OutlinedInput
                              id="transporter"
                              required
                              placeholder="Ingresa la transportadora"                                 
                              labelWidth={60}
                              type="text"
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem xs={12} sm={4} md={4}>
                          <Button value ="receive" variant="contained" style={{padding:"20px"}} color="primary" type = "submit" size="large">
                            Despachado
                          </Button>
                        </GridItem>
                    </GridContainer>
                    </form>
                    </GridItem>
                  :<span></span>
                  }
            </Grid>   
          </GridItem>
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.boxDetail} spacing={3} justify="center">    
              <Button href="/dashboard">Volver</Button>
            </Grid>
          </GridItem>
          {isSuccess == true
                                ? <Alert severity="success">Tu solicitud ha sido procesada correctamente, si deseas ver el nuevo estado actualiza la pantalla </Alert>    
                                : <span></span>
          }
          {isSuccess == false
                                ? <Alert severity="error">Hubo un problema procesando tu solicitud, por favor contacta al administrador </Alert>    
                                : <span></span>
          }
                                   
        </GridContainer>
        </div>
        </div>
          
    );
}