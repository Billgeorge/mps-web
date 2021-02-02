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

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);


  
  export default function ProductBoard(props) {

    const [products, setProductsl] = React.useState([]);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [amount, setAmount] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");    

    React.useEffect(() => getProductsForMerchant(), []);    

    const callBackSuccess = (products) =>{
      setProductsl(products)      
    }

    const history = useHistory();

    const copyUrl = (id) => {
      var getUrl = window.location;
      var baseUrl = getUrl .protocol + "//" + getUrl.host + "/";
      navigator.clipboard.writeText(baseUrl+"agree-payment?idp="+id);
    }

    const createProduct = () =>{
        history.push("create-product")
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

    const getProductsForMerchant = (filter,value) => {
      const merchantId = getMerchantId()
      console.log('getting withdrawals ')
      let url=`${CORE_BASEURL}/product/merchant/${merchantId}`
      consumeServiceGet(callBack,callBackSuccess,url)      
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
                   <Grid item xs={12}><Button style={{marginLeft:"10px"}} color="primary"  onClick={createProduct}> Crear Producto</Button><Button  style={{marginLeft:"10px"}} color="primary" disabled={!isEnabled} > Eliminar seleccionados</Button></Grid>                   
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
                        {products.map((row) => (
                          <TableRow>
                            <TableCell align="center">
                                <center>
                                    <Checkbox
                                    value={row.shortId}                                  
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                  />
                                </center>
                            </TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">{
                              formatter.format(row.amount)
                            }</TableCell>
                            <TableCell align="right"><center><Button onClick={() => copyUrl(row.shortId)} color="primary">Copiar Enlace</Button></center></TableCell>
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