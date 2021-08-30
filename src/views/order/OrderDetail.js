import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Button from '@material-ui/core/Button';

import {CORE_BASEURL,getOrderState} from 'constant/index'
import {consumeServiceGet} from 'service/ConsumeService'
import {getIdFromUrl} from 'util/UrlUtil'
import Alert from '@material-ui/lab/Alert';

import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import {getLegibleDate} from 'util/DateUtil'


const useStyles = makeStyles(styles);

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
  
  export default function OrderDetail(props) {

    const [order, setOrder] = React.useState({
        customer:{}
    });
    const [isSuccess, setIsSuccess] = React.useState(null);
    
      
    const classes = useStyles();
    

    const callBackSuccessGet = (order) =>{
        order.creationDate = getLegibleDate(order.creationDate)
      setOrder(order)                 
    }

    const callBackError = () => {
      console.log('error error in get')
      setIsSuccess(false)
    }

    
    React.useEffect(() => getPaymentData(), []);

    const getPaymentData = () => {
      setIsSuccess(null)
      const id = getIdFromUrl()
      const url = `${CORE_BASEURL}/order/customer/${id}`
      consumeServiceGet(callBackError,callBackSuccessGet,url)
    }
  
    return (
        <div>
        <ResponsiveDrawe />
        <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center">
        | <GridItem xs={12} sm={12} md={12} className={classes.grid}>        
            <Grid container className={classes.box}  spacing={3}>               
                <Grid item >
                    <h3>Detalle de orden : </h3>
                </Grid>
            </Grid>
          </GridItem>          
         <GridItem xs={12} sm={12} md={3} className={classes.grid}>
                <Grid container className={classes.boxDetail} spacing={3}>                   
                    <Grid item ><span>Valor :</span> <br/><span className={classes.valueTextDetail}>{formatter.format(order.amount)}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={3} className={classes.grid}>
                <Grid container className={classes.boxDetail} spacing={3}>                   
                    <Grid item ><span>Fecha Creación:</span> <br/><span className={classes.valueTextDetail}>{order.creationDate}</span></Grid>
                </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={3} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Nombre del cliente:</span> <br/><span className={classes.valueTextDetail}>{typeof (order.customer.name)=='undefined'?'Nombre vacio':`${order.customer.name} ${!(order.customer.lastName)?'':order.customer.lastName}`}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={3} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Celular del cliente:</span> <br/><span className={classes.valueTextDetail}>{order.customer.contactNumber}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Id:</span> <br/><span className={classes.valueTextDetail}>{order.id}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Dirección del cliente:</span> <br/><span className={classes.valueTextDetail}>{!(order.customer.address)?'Dirección vacia':`${order.customer.address}`}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Barrio del cliente:</span> <br/><span className={classes.valueTextDetail}>{!(order.customer.neighborhood)?'Barrio vacio':`${order.customer.neighborhood}`}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Ciudad del cliente:</span> <br/><span className={classes.valueTextDetail}>{!(order.customer.city)?'Ciudad vacia':`${order.customer.city}`}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Email del cliente:</span> <br/><span className={classes.valueTextDetail}>{!(order.customer.email)?'Email vacio':`${order.customer.email}`}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Departamento del cliente:</span> <br/><span className={classes.valueTextDetail}>{!(order.customer.department)?'Departamento vacio':`${order.customer.department}`}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Observaciones:</span> <br/><span className={classes.valueTextDetail}>{!(order.observations)?'Sin observaciones':`${order.observations}`}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Estado:</span> <br/><span className={classes.valueTextDetail}>{getOrderState(order.orderStatus)}</span></Grid>
              </Grid>   
         </GridItem>
         <GridItem xs={12} sm={12} md={4} className={classes.grid}>
              <Grid container className={classes.boxDetail} spacing={3}>                   
                <Grid item ><span>Vendedor:</span> <br/><span className={classes.valueTextDetail}>{!(order.sellerName)?'Ciudad vacia':`${order.sellerName}`}</span></Grid>
              </Grid>   
         </GridItem>
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.boxDetail} spacing={3} justify="center">    
              <Button href="/dashboard-dropseller">Volver</Button>
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