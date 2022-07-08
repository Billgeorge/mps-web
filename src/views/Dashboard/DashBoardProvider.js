import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Alert from '@material-ui/lab/Alert';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Footer from "components/Footer/Footer.js";
import { getMerchantId, getMerchantName } from 'service/AuthenticationService';
import { downloadPDF } from 'util/FileUtil';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";

import { getLegibleDate } from 'util/DateUtil'

import { consumeServiceGet } from 'service/ConsumeService'
import { CORE_BASEURL, getOrderState, LOGISTIC_SERVICE_URL } from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import IconButton from '@material-ui/core/IconButton';

import NavigateNextSharpIcon from '@material-ui/icons/NavigateNextSharp';
import NavigateBeforeSharpIcon from '@material-ui/icons/NavigateBeforeSharp';




const useStyles = makeStyles(styles);



export default function DashBoard(props) {

  const history = useHistory();

  const [ordersProvider, setOrders] = React.useState({
    orderItems: [],
    totalAmountSold: 0,
    totalOrders: 0,
    totalPages: 1

  });
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => getOrdersForProvider(), []);

  const [page, setPage] = React.useState(1);

  const [orderState, setOrderState] = React.useState(0);


  const handleChangeOrderState = (event) => {
    setErrorMessage("")
    setOrderState(event.target.value);
  };

  const callBackSuccess = (ordersProvider) => {
    setOrders(ordersProvider)
  }

  const callBackSuccessGetLabel = (data) => {
    downloadPDF(data.pdf.replaceAll('"',''),'rotulo')    
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })  

  const callBack = (msg) => {
    setOrders({
      orderItems: [],
    totalAmountSold: 0,
    totalOrders: 0,
    totalPages: 1
    })
    if (msg === 404) {
      setErrorMessage("No hay ordenes para mostrar")
    } else {
      setErrorMessage("Error Cargando ordenes")
    }
  }

  const callBackGetLabel = (error) => {
    if (error != null && typeof error === 'object') {
      setErrorMessage(error.message)
    } else if (error != null && typeof error === 'string') {
      setErrorMessage(error)
    }
    else {
      setErrorMessage('Error descargando rotulo')
    }
  }

  const getLabel = () => {
    const url = `${LOGISTIC_SERVICE_URL}inter-label/${getMerchantId()}`
    consumeServiceGet(callBackGetLabel, callBackSuccessGetLabel, url)
  }

  const filterTransactions = () => {
    setErrorMessage("")
    getOrdersForProvider()
  }

  const getOrdersForProvider = (filter, value) => {
    
    let url = `${CORE_BASEURL}/catalogue/order/provider`

    if (filter === 'changePage') {
      url = `${url}?pageNumber=${value}`
    }else {
      url = `${url}?pageNumber=0`
    }

    if (orderState > 0) {
      url = `${url}&state=${orderState}`
    }  

    consumeServiceGet(callBack, callBackSuccess, url)
  }

  const handleNextPage = (event) => {
    console.log("page", page)
    setPage(page + 1);
    getOrdersForProvider('changePage', page + 1)
  };

  const handleBeforePage = (event) => {
    setPage(page - 1);
    getOrdersForProvider('changePage', page - 1)
  };

  const classes = useStyles();

  return (
    <div>
      <ResponsiveDrawe />

      <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >


          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <br />
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12} sm={12} md={6} >
                Hola {getMerchantName()}, Bienvenido a EIKOOS.
              </Grid>              
              <br />
              <Grid item xs={12} sm={12} md={12}>Filtrar Transacciones:</Grid>
              <Grid item xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
                <FormControl variant="outlined" style={{ width: "180px" }}>
                  <InputLabel id="demo-simple-select-outlined-label">Estado</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="estado"
                    value={orderState}
                    onChange={handleChangeOrderState}
                    label="Estado"
                  >
                    <MenuItem value={-1}>
                      <em>Ninguno</em>
                    </MenuItem>
                    <MenuItem value={1}>Fallido</MenuItem>
                    <MenuItem value={2}>Creado</MenuItem>
                    <MenuItem value={3}>Pagado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>             

              <Grid item xs={12} sm={12} md={6} style={{ textAlign: "center" }} ><Button color="primary" onClick={filterTransactions}> Filtrar</Button></Grid>
            
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item ><span>Total ventas {orderState != 0 && orderState != -1 ? getOrderState(orderState) + 's' : ''}: </span> <br /><span className={classes.valueText}>{formatter.format(ordersProvider.totalAmountSold)}</span></Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item ><span> Número de ordenes {orderState != 0 && orderState != -1 ? getOrderState(orderState) + 's' : ''}: </span> <br /><span className={classes.valueText}>{ordersProvider.totalOrders}</span></Grid>
            </Grid>
          </GridItem>
          
          <Grid item xs={12} sm={12} md={4} className={classes.grid}>
            <Button color="primary" onClick={getLabel}>
              Descargar rótulo del corte
            </Button>
          </Grid>
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12}><h2>Ordenes del corte</h2></Grid>
              <Grid item xs={12} >
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Nombre del Producto </TableCell>
                        <TableCell align="right">Sku del producto</TableCell>
                        <TableCell align="right">Atributos</TableCell>
                        <TableCell align="right">Estado</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Precio de venta</TableCell>
                        <TableCell align="right">Fecha de creación</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ordersProvider.orderItems.map((row) => {
                        
                        return (

                          <TableRow      
                            key={row.id}                            
                          >
                            
                            <TableCell align="right">{row.productName}</TableCell>
                            <TableCell align="right">{row.sku}</TableCell>
                            <TableCell align="center">{row.attributes ? row.attributes : "Sin atributos"}</TableCell>
                            <TableCell align="right">{getOrderState(row.state)}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{formatter.format(row.sellPrice)}</TableCell>                                       
                            
                            <TableCell align="right">{
                              getLegibleDate(row.creationDate)
                            }</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ float: 'left' }}>Página: {page}. Total registros: {ordersProvider.totalOrders ? ordersProvider.totalOrders : 25}</p>
                  {
                    page > 1 ? <IconButton onClick={handleBeforePage} aria-label="anterior">
                      <NavigateBeforeSharpIcon />
                    </IconButton> : <span></span>
                  }

                  {
                    page < ordersProvider.totalPages ? <IconButton onClick={handleNextPage} aria-label="siguiente">
                    <NavigateNextSharpIcon />
                  </IconButton> : <span></span>
                  }

                </div>
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