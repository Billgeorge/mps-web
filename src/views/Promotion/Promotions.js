import React, { useEffect, useReducer, useState } from 'react'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// @material-ui/core components
import GridContainer from 'components/Grid/GridContainer'
import GridItem from 'components/Grid/GridItem'
import ResponsiveDrawer from 'components/LeftMenu/ResponsiveDrawer'
import styles from "assets/jss/material-kit-react/views/Promotions.js";
import { getQueyParamFromUrl } from 'util/UrlUtil';
import { useHistory} from 'react-router';
import { consumeServiceGet } from 'service/ConsumeService';
import { Card, CardHeader, CircularProgress,} from '@material-ui/core';
import { consumeServicePatch } from 'service/ConsumeService';
import Button from "components/CustomButtons/Button.js";
import Alert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { CORE_BASEURL } from 'constant';
/* Reducer */
import { promotionsReducer } from 'reducers/promotionsReducer';
import { types } from 'types.js/types';
import { doSuccessMessage, doErrorMessage, doGetProduct, doIsLoading } from 'actions/actionsPromotion';


const initialState = {
  errorMessage: '', 
  successMessage: '', 
  isLoading: false,
  mustChange: false,
  product: {
    productName: '',
    imageURL: '',
  },
  isLoadinImage: false,
}

const useStyles = makeStyles(styles);



export const Promotions = () => {
    const classes = useStyles();
 
    const idc = getQueyParamFromUrl('idc');  

    const history = useHistory();
    
    const [{successMessage, isLoading, mustChange, product, isLoadingImage}, dispatch] = useReducer(promotionsReducer, initialState)
    const {productName, imageURL} = product;

    const [promotions, setPromotions] = React.useState([]);      
    

      const callBackErrorGetProduct = () => {
        dispatch(doErrorMessage('Error obteniendo información de producto'))
       
    }

    const callBackSuccessGetProductInfo = (product) => {
       dispatch(doGetProduct(product))
  }

    const callBack = (error) => {
      if (error != null) {
        dispatch(doErrorMessage(error))
      } else {
        dispatch(doErrorMessage('Ha ocurrido un error inesperado por favor contactar al administrador'))
      }
    }
    
    const callBackSuccess = (data) => {
      setPromotions(data);      
    }      

    
    const callBackDelete = (error) =>{
      dispatch(doErrorMessage(error))
    }
  
    const getProductInformation = () => {
      const url = `${CORE_BASEURL}/dropshippingsale/public/view/checkout/${idc}`;
      consumeServiceGet(callBackErrorGetProduct, callBackSuccessGetProductInfo, url);
  }

    const getPromotionById = () => {
      const url = `${CORE_BASEURL}/discounts/${idc}`;
      consumeServiceGet(callBack, callBackSuccess, url);

    }   

    const removePromotion = (payload) => {
      const url = `${CORE_BASEURL}/discounts/remove`
       consumeServicePatch(payload, callBackDelete, callBackSuccessDelete, url);
    }

    const callBackSuccessDelete = () =>{
      dispatch(doSuccessMessage(mustChange, 'Promocion eliminada'))
      
    }

    
    useEffect(() => {
      getPromotionById();

  }, [mustChange])

  useEffect(() => {
    getProductInformation();
    dispatch({type: types.isLoadingImage})
  }, [])
  

    
    const handleRemove = (quantity) => { 
                 
      if (isLoading) return;
      const payload = {id:idc, quantity}     
        removePromotion(payload);
        dispatch(doIsLoading())   
    }

    

    return (
        <>  
            <ResponsiveDrawer />
            <div className={classes.container}>
              
                <GridContainer  justify="center" >
                <GridItem xs={12} sm={12} md={12} >
                <ArrowBackIcon className={classes.arrow} onClick={()=>history.push(`/product-drop`)} />                            
                <Grid> <h5 className={classes.title}>Estas viendo promociones del producto:</h5></Grid> 
                 </GridItem>        
              
    
        <GridItem xs={12} sm={12} md={12}>
            <Grid >                     
              
              <Grid item xs={12} sm={12} md={12} style={{ display: 'flex', justifyContent: 'center'}} >
                    
            
              {isLoadingImage 
            ? <center> <CircularProgress /></center>
            : 
          <Card  >
            <CardHeader
              className={classes.cardHeader}
              title={productName}
                  
              />
            <img
                className={classes.picture}                        
                src={imageURL}
                alt={productName}
              />
              </Card>  }                 
              </Grid>
            </Grid>
        </GridItem>  


          <GridItem xs={12} sm={12} md={12} >
            <Button  onClick={()=>history.push(`/create-promotion?idc=${idc}`)} color="primary" style={{marginBottom: '1rem'}}>
              Crear Promoción
            </Button>
           
            </GridItem>

           

            <Grid item xs={12} >
                {isLoading && <center> <CircularProgress /></center>}
                {successMessage && <Alert severity="success" style={{marginBottom: '2rem', width: '60%', margin:'0 auto'}}>{successMessage}</Alert>}
                <TableContainer component={Paper} style={{ margin: '0 auto', width: '90%'}}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Cantidad</TableCell>
                        <TableCell align="center">Precio de Promoción</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {promotions.map((promo) => (
                        <TableRow>
                          <TableCell align="center" >{promo.quantity}</TableCell>
                          <TableCell align="center">{promo.discount.amount}</TableCell>
                          <TableCell align="center">
                            <Button onClick={() => handleRemove(promo.quantity)} color="primary">
                            Eliminar</Button>  
                            </TableCell>                           
                                              
                        </TableRow>
                      ))}
                      
                    </TableBody>
                  </Table>
                </TableContainer>
               
              </Grid>
              
          {promotions.length === 0 && <Alert severity="error" style={{marginTop: '.5rem'}}> Sin Promociones Creadas</Alert>}
                </GridContainer>
                
            </div>
        </>
    )
}
