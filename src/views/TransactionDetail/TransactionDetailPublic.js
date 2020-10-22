import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';


import {CORE_BASEURL,getPaymentState} from 'constant/index'
import {consumeServiceGet,consumeServicePatch} from 'service/ConsumeService'
import {getIdFromUrl} from 'util/UrlUtil'
import Alert from '@material-ui/lab/Alert';


import Button from '@material-ui/core/Button';

import HeaderLinks from "components/Header/HeaderLinks";
import Header from "components/Header/Header.js";



const useStyles = makeStyles(styles);
  
  export default function DashBoard(props) {
      
    const classes = useStyles();
    const { ...rest } = props;
    const [payment, setPayment] = React.useState({});
    const [isSuccess, setIsSuccess] = React.useState(null);
    
    const getPaymentData = () => {
      const idPayment = getIdFromUrl()
      const url = `${CORE_BASEURL}/payment/${idPayment}`
      consumeServiceGet(callBackError,callBackSuccessGet,url)
    }

    const callBackSuccessGet = (payment) =>{
      setPayment(payment)      
      renderForm()     
    }

    const callBackError = () => {
      setIsSuccess(false)
    }

    const renderForm = () =>{
      document.disputeForm.onsubmit = function(event){
        console.log(event.submitter.outerText)
        event.preventDefault()
        if(event.submitter.outerText == "CREAR DISPUTA"){
          console.log("Creando disputa")
         updatePaymentState(5)
        }else{
          console.log("Notificando recibido")
          updatePaymentState(7)
        }
      }
      let htmlInputs = document.forms["disputeForm"].getElementsByTagName("input");
      console.log(htmlInputs)
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

    const updatePaymentState = (state) =>{
      const url = `${CORE_BASEURL}/payment/public/updateState`
      consumeServicePatch({
        paymentId:getIdFromUrl(),
        state:state,
        numberId:document.getElementById("numberId").value
      },callBackError,callBackSuccessPatch,url)
    }

    const callBackSuccessPatch = () =>{
      setIsSuccess(true)     
    }
  

    React.useEffect(() => getPaymentData(), []);
  
    return (
        <div>
        <Header
          absolute
          color="transparent"
          brand="MiPagoSeguro"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
              backgroundColor:"#03a9f4"
            /*backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"*/
          }}
        >
        <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center">
        | <GridItem xs={12} sm={12} md={12} className={classes.grid}>        
            <Grid container className={classes.box}  spacing={3}>               
                <Grid item >
                    <h3>Detalle de transacción :  </h3>
                </Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.boxDetail} spacing={3}>                   
                   <Grid item ><span>Id:</span> <br/><span className={classes.valueTextDetail}>{payment.id}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.boxDetail} spacing={3}>                   
                   <Grid item ><span>Valor :</span> <br/><span className={classes.valueTextDetail}>{payment.amount}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.boxDetail} spacing={3}>                   
                   <Grid item ><span>Fecha Creación:</span> <br/><span className={classes.valueTextDetail}>{payment.creationDate}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                <Grid container className={classes.boxDetail} spacing={3}>                   
                   <Grid item ><span>Estado:</span> <br/><span className={classes.valueTextDetail}>{getPaymentState(payment.idState)}</span></Grid>
                </Grid>   
         </GridItem>         
         <GridItem xs={12} sm={12} md={8} className={classes.grid}>
            <Grid container className={classes.boxDetail, classes.deliveryForm} spacing={3} justify="center">                   
            { payment.idState >2 && payment.idState<5
            ?<Grid item >
                    <form validated="true" name="disputeForm" id="disputeForm">
                      <GridContainer>
                        <GridItem xs={12} sm={4} md={4}>
                          
                        
                          <FormControl style={{width:"100%",paddingBottom:"10px"}}>
                            <InputLabel htmlFor="numberId">Cédula</InputLabel>
                            <OutlinedInput
                              id="numberId"
                              required
                              placeholder="Ingresa tu número de cédula"                                 
                              labelWidth={60}
                              type="text"
                            />
                          </FormControl>
                        </GridItem>
                        <GridItem xs={6} sm={4} md={4}>
                          <Button value="dispute" variant="contained" style={{padding:"20px"}} color="primary" type = "submit" size="large">
                            Crear disputa
                          </Button>
                        </GridItem>
                        <GridItem xs={6} sm={4} md={4}>
                          <Button value ="receive" variant="contained" style={{padding:"20px"}} color="primary" type = "submit" size="large">
                            Ya Recibí
                          </Button>
                        </GridItem>
                    </GridContainer>
                    </form>
                </Grid>
              :<span></span>
            }
            </Grid>   
            </GridItem>
            {isSuccess == true
                                  ? <Alert severity="success">Tu solicitud ha sido procesada correctamente, si deseas ver el nuevo estado actualiza la pantalla </Alert>    
                                  : <span></span>            }
            {isSuccess == false
                                ? <Alert severity="error">Hubo un problema procesando tu solicitud, por favor contacta al administrador </Alert>    
                                : <span></span>
            }                                  
            
        </GridContainer>
        </div>
        </div>
        </div>  
    );
}