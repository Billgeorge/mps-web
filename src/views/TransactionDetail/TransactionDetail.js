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

import HeaderLinksSession from "components/Header/HeaderLinksSession.js";
import Header from "components/Header/Header.js";


const useStyles = makeStyles(styles);
  
  export default function DashBoard(props) {

    const [payment, setPayment] = React.useState({});
    const [isSuccess, setIsSuccess] = React.useState(null);
    
      
    const classes = useStyles();
    const { ...rest } = props;

    const callBackSuccessGet = (payment) =>{
      setPayment(payment)     
    }

    const callBackSuccessPatch = () =>{
      setIsSuccess(true)     
    }

    
    React.useEffect(() => getPaymentData(), []);
    const getPaymentData = () => {
      const idPayment = getIdFromUrl()
      const url = `${CORE_BASEURL}/payment/${idPayment}`
      consumeServiceGet(callBackError,callBackSuccessGet,url)
    }

    const callBackError = () => {
      setIsSuccess(false)
    }
    
    const updatePaymentState = (state) =>{
      const url = `${CORE_BASEURL}/payment/updateState`
      consumeServicePatch({
        paymentId:getIdFromUrl(),
        state:state
      },callBackError,callBackSuccessPatch,url)
    }

    const markAsShipped = () => {
      updatePaymentState(4)
    }

    const markAsDisputed = () => {
      updatePaymentState(5)
    }
  
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
                    <h3>Detalle de transacción : </h3>
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
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
         <Grid container className={classes.boxDetail} spacing={3} justify="center">                   
                   <Grid item >
                   { payment.idState === 3
                  ?<Button variant="contained" style={{padding:"20px"}} color="primary" size="large" onClick={markAsShipped}>Marcar como despachado</Button>
                  :<span></span>
                  }
            </Grid></Grid>   
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.grid}>
            <Grid container className={classes.boxDetail} spacing={3} justify="center">                   
                <Grid item >
                  { payment.idState >2 && payment.idState<5
                  ?<Button variant="contained" style={{padding:"20px"}} color="primary" size="large" onClick={markAsDisputed} >Crear disputa sobre venta</Button>
                  :<span></span>
                  }                    
                </Grid>
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
        </div>  
    );
}