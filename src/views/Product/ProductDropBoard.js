import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

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
import {CORE_BASEURL} from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

const useStyles = makeStyles(styles);


  
  export default function ProductDropBoard() {

    const [products, setProductsl] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");    

    React.useEffect(() => getProductsForMerchant(), []);    

    const callBackSuccess = (products) =>{
      setProductsl(products)
      if(products.length==0){
          setErrorMessage("No hay productos para mostrar")
      }      
    }

    const copyUrl = (id) => {
      var getUrl = window.location;
      var baseUrl = getUrl .protocol + "//" + getUrl.host + "/";
      navigator.clipboard.writeText(baseUrl+"checkout?idc="+id);
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    const callBack = (msg) => {
      setProductsl([])
      if(msg==404){
        setErrorMessage("No hay productos para mostrar")        
      }else{
        setErrorMessage("Error Cargando productos")
      }      
    }

    const getProductsForMerchant = () => {
      const merchantId = getMerchantId()
      console.log('getting drop products ')
      let url=`${CORE_BASEURL}/dropshippingsale/sellermerchant/${merchantId}`
      consumeServiceGet(callBack,callBackSuccess,url)      
    }
      
    const classes = useStyles();
    
    return (
        <div>       
       
        <ResponsiveDrawe />       
        <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >
         <GridItem xs={12} sm={12} md={12} className={classes.grid}>           
                <Grid container className={classes.box} spacing={3}>
                <Grid item  xs={12}><h2>Tus Productos Dropshipping</h2></Grid>
                <GridItem xs={12} sm={12} md={12} className={classes.grid}>        
                    <Grid container className={classes.box}  spacing={3}>               
                        <Grid item xs={12} sm={12} md={12} >
                            A continuación ves los productos dropshiṕping que vinculaste:                     
                        </Grid>                              
                    </Grid>
                </GridItem>   
                   <Grid item xs={12} >
                   <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>                          
                          <TableCell align="center">Nombre</TableCell>
                          <TableCell align="center">Precio de compra</TableCell> 
                          <TableCell align="center">Precio de venta</TableCell>
                          <TableCell align="center">Inventario</TableCell>
                          <TableCell align="center">Url checkout</TableCell>                         
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((row) => (
                          <TableRow>                            
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{
                              formatter.format(row.buyPrice)
                            }</TableCell>
                            <TableCell align="center">{
                              formatter.format(row.sellPrice)
                            }</TableCell>
                            <TableCell align="center">{row.inventory}</TableCell>
                            <TableCell align="right"><center><Button onClick={() => copyUrl(row.id)} color="primary">Copiar Enlace</Button></center></TableCell>                            
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