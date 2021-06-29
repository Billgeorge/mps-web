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
import consumeServicePost from 'service/ConsumeService'
import {CORE_BASEURL} from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);


  
  export default function ProductBoard(props) {

    const [products, setProductsl] = React.useState([]);
    const [isChecked, setIsCHecked] = React.useState(false);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    const [idsToDelete, setIdsToDelete] = React.useState([]);    

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

    const deleteProducts = () =>{
      let url=`${CORE_BASEURL}/product/delete`
      consumeServicePost({    
        ids:idsToDelete
      },callBackDelete,callBackSucess,url)   
    }
    const callBackSucess = () =>{
      setSuccessMessage("Productos eliminados, por favor actualiza la página si deseas ver los productos actualizados.")    
    }

    const validatedChecked = (event) =>{      
      var inputElements = document.getElementsByClassName('productCheck');
      var cont = 0
      for(var i=0; inputElements[i]; ++i){
        console.log("array", inputElements[i].value)
            if(inputElements[i].checked){      
              cont++        
              if(idsToDelete.indexOf(inputElements[i].value)=='-1'){
                idsToDelete.push(inputElements[i].value)
              }                
            }else{
              if(idsToDelete.indexOf(inputElements[i].value)!='-1'){
                idsToDelete.splice(idsToDelete.indexOf(inputElements[i].value),1)
              }              
            }
      }
      if(cont>0){
        setIsEnabled(true)
      }else{
        setIsEnabled(false)
      }
      console.log("array", idsToDelete)
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
    const callBackDelete = (error) => {
      if(error!=null && typeof error === 'object'){        
        setErrorMessage(error)
        }else if(error!=null && typeof error === 'String'){
          setErrorMessage({'Error':error})
        }
        else{
          setErrorMessage({'Error':'Ha ocurrido un error inesperado por favor contactar al administrador'})
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
                   <Grid item xs={12}><Button style={{marginLeft:"10px"}} color="primary"  onClick={createProduct}> Crear Producto</Button><Button  style={{marginLeft:"10px"}} color="primary" disabled={!isEnabled} onClick={deleteProducts} > Eliminar seleccionados</Button></Grid>                   
                   <Grid item xs={12} >
                   <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell></TableCell>
                          <TableCell align="center">Descripción</TableCell>
                          <TableCell align="center">Valor</TableCell>
                          <TableCell align="center">Inventario</TableCell>
                          <TableCell align="center">Url</TableCell>
                          <TableCell align="center">Editar</TableCell>
                          <TableCell align="center">DropShipping</TableCell>                         
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((row) => (
                          <TableRow>
                            <TableCell align="center">
                                <center>
                                    <input
                                    type="checkbox"
                                    className="productCheck"
                                    value={row.shortId}
                                    defaultChecked={isChecked}                                  
                                    color="primary"
                                    onChange={validatedChecked}                                    
                                  />
                                </center>
                            </TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">{
                              formatter.format(row.amount)
                            }</TableCell>
                            <TableCell align="center">{row.inventory}</TableCell>
                            <TableCell align="right"><center><Button onClick={() => copyUrl(row.shortId)} color="primary">Copiar Enlace</Button></center></TableCell>
                            <TableCell align="right"><center><a href={"/edit-product?idp="+row.shortId}><Button color="primary">Editar producto</Button></a></center></TableCell>
                            <TableCell align="center">{row.dropshipping ? "Si":"No"}</TableCell>
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