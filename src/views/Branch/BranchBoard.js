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

    const [branches, setBranches] = React.useState([]);
    const [isChecked, setIsCHecked] = React.useState(false);
    const [isEnabled, setIsEnabled] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [successMessage, setSuccessMessage] = React.useState("");
    
    React.useEffect(() => getBranchesForMerchant(), []);    

    const callBackSuccess = (branches) =>{
        setBranches(branches)      
    }

    const history = useHistory();

    const createBranch = () =>{
        history.push("create-branch")
    }
    

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    })

    const callBack = (error) => {
      setBranches([])
      if(error==404){
        setErrorMessage("No hay productos para mostrar")        
      }else{
        setErrorMessage("Error Cargando productos")
      }      
    }
    
    const getBranchesForMerchant = (filter,value) => {
      const merchantId = getMerchantId()
      console.log('getting withdrawals ')
      let url=`${CORE_BASEURL}/branch/merchant/${merchantId}`
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
                <Grid item  xs={12}><h2>Sucursales</h2></Grid>
                <GridItem xs={12} sm={12} md={12} className={classes.grid}>        
                    <Grid container className={classes.box}  spacing={3}>               
                        <Grid item xs={12} sm={12} md={12} >
                            A continuación ves las bodegas que tienes registradas                    
                        </Grid>                              
                    </Grid>
                </GridItem>   
                   <Grid item xs={12}><Button style={{marginLeft:"10px"}} color="primary"  onClick={createBranch}> Crear Bodega</Button></Grid>                   
                   <Grid item xs={12} >
                   <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Nombre</TableCell>
                          <TableCell align="center">Dirección</TableCell>
                          <TableCell align="center">Email Encargado</TableCell>
                          <TableCell align="center">Número de encargado</TableCell>                                             
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {branches.map((row) => (
                          <TableRow>                            
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{
                              row.address
                            }</TableCell>
                            <TableCell align="center">{row.contactEmail}</TableCell>
                            <TableCell align="center">{row.contactPhone}</TableCell>
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