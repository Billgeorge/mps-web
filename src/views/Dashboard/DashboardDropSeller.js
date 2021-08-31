import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import IconButton from '@material-ui/core/IconButton';
import SplitButton from 'components/SplitButton/SplitButton';

import Alert from '@material-ui/lab/Alert';
import NavigateNextSharpIcon from '@material-ui/icons/NavigateNextSharp';
import NavigateBeforeSharpIcon from '@material-ui/icons/NavigateBeforeSharp';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Footer from "components/Footer/Footer.js";
import { getMerchantId, getMerchantName } from 'service/AuthenticationService';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { getLegibleDate } from 'util/DateUtil'

import { consumeServiceGet } from 'service/ConsumeService'
import consumeServicePost from '../../service/ConsumeService'
import { CORE_BASEURL, getOrderState } from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';




const useStyles = makeStyles(styles);



export default function DashboardDropSeller(props) {

  const [products, setProducts] = React.useState({
    orders: [],
    totalOrderAmountByStatus: 0,
    totalProfitSaleByStatus: 0,
    totalOrderByStatus: 0
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [confirmSuccessMessage, setConfirmSuccessMessage] = React.useState("");
  

  const [page, setPage] = React.useState(1);

  React.useEffect(() => getProductsForMerchant(), []);

  const [duration, setDuration] = React.useState(15);

  const [orderState, setOrderState] = React.useState(0);

  const [filter, setFilter] = React.useState({
    guideNumber: null,
    contactPhone: null
  });

  const handleNextPage = (event) => {
    console.log("page", page)
    setPage(page + 1);
    getProductsForMerchant('changePage', page + 1)
  };

  const handleBeforePage = (event) => {
    setPage(page - 1);
    getProductsForMerchant('changePage', page - 1)
  };

  const handleChangeDuration = (event) => {
    setErrorMessage("")
    setDuration(event.target.value);
  };

  const handleChangeOrderState = (event) => {
    setErrorMessage("")
    setOrderState(event.target.value);
  };

  const handleChange = (event) => {
    setErrorMessage("")
    const name = event.target.name;
    setFilter({
      ...filter,
      [name]: event.target.value,
    });
  };

  const filterTransactions = () => {
    setErrorMessage("")
    getProductsForMerchant("numbers", "")
  }

  const callBackSuccess = (products) => {
    setProducts(products)
    setPage(products.actualPage)
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  })

  const callBack = (msg) => {
    setProducts({
      orders: [],
      totalOrderAmountByStatus: 0,
      totalProfitSaleByStatus: 0,
      totalOrderByStatus: 0
    })
    if (msg === 404) {
      setErrorMessage("No hay transacciones para mostrar")
    } else {
      setErrorMessage("Error Cargando Transacciones")
    }
  }

  const confirmOrder= (orderId) =>{
    const url = `${CORE_BASEURL}/logistic/freight/COD`
    const request = {
      orderId:orderId,
      sellerMerchantId:getMerchantId()
    }
    consumeServicePost(request,callBackConfirm,callBackSuccessConfirm,url)
  }

  const callBackSuccessConfirm =()=>{
    setConfirmSuccessMessage("Orden confirmada")
    setTimeout(() => {
      setConfirmSuccessMessage("")
   }, 2000)
  }  
  
  const callBackConfirm = (error) => {
    let errorObjects = "Error confirmando orden"
    if (error !== null) {
      if(typeof error === 'object'){
        errorObjects=JSON.stringify(error)
      }else{
        errorObjects = error
      }          
    }
    setErrorMessage(errorObjects)    
  }

  const getProductsForMerchant = (filter, value) => {
    const merchantId = getMerchantId()
    let url = `${CORE_BASEURL}/order/dropseller?merchantId=${merchantId}&durationInDays=${duration}`
    if (document.getElementById("guideNumber").value) {
      url = `${url}&guideNumber=${document.getElementById("guideNumber").value}`
    }
    if (document.getElementById("contactPhone").value) {
      url = `${url}&contactNumber=${document.getElementById("contactPhone").value}`
    }
    if (orderState > 0) {
      url = `${url}&orderState=${orderState}`
    }

    if (filter === 'changePage') {
      url = `${url}&pageNumber=${value}`
    }

    consumeServiceGet(callBack, callBackSuccess, url)
  }
  
  const classes = useStyles();


  return (
    <div>
      <ResponsiveDrawe />

      <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >
          | <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12} sm={12} md={6} >
                Hola {getMerchantName()}, Bienvenido a MiPagoSeguro.
              </Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
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
                    <MenuItem value={2}>En despacho</MenuItem>
                    <MenuItem value={3}>En entrega</MenuItem>
                    <MenuItem value={4}>Pago pendiente</MenuItem>
                    <MenuItem value={5}>Transferido</MenuItem>
                    <MenuItem value={6}>Entregado</MenuItem>
                    <MenuItem value={7}>Devolucion</MenuItem>
                    <MenuItem value={8}>Cancelado</MenuItem>
                    <MenuItem value={10}>Por confirmar</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} style={{ textAlign: "center" }} >
                <FormControl variant="outlined" style={{ width: "180px" }}>
                  <InputLabel id="demo-simple-select-outlined-label">Tiempo</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={duration}
                    onChange={handleChangeDuration}
                    label="Tiempo"
                  >
                    <MenuItem value={15}>
                      <em>Ninguno</em>
                    </MenuItem>
                    <MenuItem value={10}>últimos 10 días</MenuItem>
                    <MenuItem value={20}>últimos 20 días</MenuItem>
                    <MenuItem value={30}>últimos 30 días</MenuItem>
                    <MenuItem value={60}>últimos 60 días</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} style={{ textAlign: "center" }}>
                <TextField onChange={handleChange} value={filter.guideNumber?filter.guideNumber:''} inputProps={{ min: 0, id: 'guideNumber', name: 'guideNumber' }} type="number" style={{ width: "180px", backgroundColor: "white" }} id="outlined-basic" label="Número de guía" variant="outlined" required />
              </Grid>
              <Grid item xs={12} sm={12} md={4} style={{ textAlign: "center" }} >
                <TextField onChange={handleChange} value={filter.contactPhone?filter.contactPhone:''} inputProps={{ min: 0, id: 'contactPhone', name: 'contactPhone' }} type="number" style={{ width: "180px", backgroundColor: "white" }} id="outlined-basic" label="Celular cliente" variant="outlined" required />
              </Grid>
              <Grid item xs={12} sm={12} md={4} style={{ textAlign: "center" }} ><Button color="primary" onClick={filterTransactions}> Filtrar</Button></Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item ><span>Total monto órdenes {orderState != 0 && orderState != -1 ? getOrderState(orderState) + 's' : ''}:</span> <br /><span className={classes.valueText}>{formatter.format(products.totalOrderAmountByStatus)}</span></Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item ><span>Total utilidad bruta {orderState != 0 && orderState != -1 ? getOrderState(orderState) + 's' : ''}:</span> <br /><span className={classes.valueText}>{formatter.format(products.totalProfitSaleByStatus)}</span></Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item ><span>Número de órdenes:</span> <br /><span className={classes.valueText}>{products.totalOrderByStatus}</span></Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12}><h2>Últimas Ordenes</h2></Grid>
              {confirmSuccessMessage != ""
            ?
            <Alert severity="success">{confirmSuccessMessage}</Alert>
            : <span>	&nbsp;</span>
          }
              <Grid item xs={12} >
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Acción</TableCell>
                        <TableCell>Producto </TableCell>
                        <TableCell align="right">Nombre Cliente </TableCell>
                        <TableCell align="right">Celular Cliente </TableCell>
                        <TableCell align="right">Precio de venta</TableCell>
                        <TableCell align="center">Precio de compra</TableCell>
                        <TableCell align="center">Precio de flete</TableCell>
                        <TableCell align="center">Utilidad por venta</TableCell>
                        <TableCell align="right">Estado</TableCell>
                        <TableCell align="right">Guía</TableCell>
                        <TableCell align="right">Fecha de creación</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.orders.map((row) => (
                        <TableRow key={row.orderId}>
                          <TableCell component="th" scope="row">
                            {row.orderState===10?
                              <SplitButton options={[
                                { label: "Editar Pedido", action: "/customer?id=" + row.orderId },
                                { label: "Confirmar",callBack:confirmOrder,id:row.orderId }
                              ]} ></SplitButton>
                              :<span></span>
                            }
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <a target="_blank" href={`/order-detail/${row.orderId}`} style={{ cursor: "pointer" }}>{row.productName}</a>
                          </TableCell>
                          <TableCell align="right">{row.customerName}</TableCell>
                          <TableCell align="right">{row.customerPhone}</TableCell>
                          <TableCell align="right">{formatter.format(row.sellPrice)}</TableCell>
                          <TableCell align="right">{formatter.format(row.buyPrice)}</TableCell>
                          <TableCell align="right">{formatter.format(row.freightPrice)}</TableCell>
                          <TableCell align="right">{formatter.format(row.profitSale)}</TableCell>
                          <TableCell align="right">{getOrderState(row.orderState)}</TableCell>
                          <TableCell align="right">{row.guideNumber}</TableCell>
                          <TableCell align="right">{
                            getLegibleDate(row.creationDate)
                          }</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <div style={{ textAlign: 'right' }}>
                  <p style={{ float: 'left' }}>Página: {page}. Total registros: {products.totalRecords ? products.totalRecords : 15}</p>
                  {
                    page > 1 ? <IconButton onClick={handleBeforePage} aria-label="anterior">
                      <NavigateBeforeSharpIcon />
                    </IconButton> : <span></span>
                  }

                  {
                    page < products.totalPages ? <IconButton onClick={handleNextPage} aria-label="siguiente">
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