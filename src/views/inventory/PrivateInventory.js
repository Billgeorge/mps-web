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

import { useHistory } from "react-router-dom";
import {getLegibleDate} from 'util/DateUtil'

const useStyles = makeStyles(styles);


  
  export default function PrivateInventoryBoard(props) {

    const [inventories, setInventories] = React.useState([]);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    
    React.useEffect(() => getPrivateInventoriesForProvider(), []);    

    const callBackSuccess = (inventories) =>{
        setInventories(inventories)      
    }

    const history = useHistory();


    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    const callBack = (error) => {
        setInventories([])
      if(error==404){
        setErrorMessage("No hay inventarios privados para mostrar")        
      }else{
        setErrorMessage("Error Cargando inventarios")
      }      
    }
    
    const getPrivateInventoriesForProvider = (filter,value) => {
      const merchantId = getMerchantId()
      console.log('getting inventories ')
      let url=`${CORE_BASEURL}/privateinventory/provider/${merchantId}`
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
                <Grid item  xs={12}><h2>Tus inventarios privados</h2></Grid>
                <GridItem xs={12} sm={12} md={12} className={classes.grid}>        
                    <Grid container className={classes.box}  spacing={3}>               
                        <Grid item xs={12} sm={12} md={12} >
                            A continuación ves los inventarios privados que has creado             
                        </Grid>                              
                    </Grid>
                </GridItem>     
                   <Grid item xs={12} >
                   <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Nombre de vendedor</TableCell>
                          <TableCell align="center">Nombre de producto</TableCell>
                          <TableCell align="center">Cantidad</TableCell>
                          <TableCell align="center">Fecha creación</TableCell>
                          <TableCell align="center">Editar</TableCell>                                             
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {inventories.map((row) => (
                          <TableRow>                            
                            <TableCell align="center">{row.dropSellerName}</TableCell>
                            <TableCell align="center">{
                              row.productName
                            }</TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">{getLegibleDate(row.creationDate)}</TableCell>
                            <TableCell align="center"><a href={"/edit-private-inventory?idp="+row.id}><Button style={{marginLeft:"10px"}} color="primary"> Editar inventario</Button></a></TableCell>                            
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