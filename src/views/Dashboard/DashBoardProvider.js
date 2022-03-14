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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from "components/CustomButtons/Button.js";
import { useHistory } from "react-router-dom";

import { getLegibleDate } from 'util/DateUtil'

import { consumeServiceGet } from 'service/ConsumeService'
import { CORE_BASEURL, getOrderState } from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import NavigateNextSharpIcon from '@material-ui/icons/NavigateNextSharp';
import NavigateBeforeSharpIcon from '@material-ui/icons/NavigateBeforeSharp';




const useStyles = makeStyles(styles);



export default function DashBoard(props) {

  const history = useHistory();

  const [ordersProvider, setOrders] = React.useState({
    orders: [],
    totalOrderAmountByStatus: 0,
    totalProfitSaleByStatus: 0,
    totalOrderByStatus: 0

  });
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => getOrdersForProvider(), []);

  const [duration, setDuration] = React.useState(100);

  const [page, setPage] = React.useState(1);

  const [orderState, setOrderState] = React.useState(0);

  const [selected, setSelected] = React.useState([]);

  const handleChangeDuration = (event) => {
    setErrorMessage("")
    setDuration(event.target.value);
  };

  const handleChangeOrderState = (event) => {
    setErrorMessage("")
    setOrderState(event.target.value);
  };

  const getMultipleOrdersString = (event) => {
    let multipleOrders = ''
    selected.forEach(orderId => {
      multipleOrders = multipleOrders + orderId + ','
    })
    return multipleOrders
  };

  const handleChange = (event) => {
    setErrorMessage("")
    const name = event.target.name;
    setFilter({
      ...filter,
      [name]: event.target.value,
    });
  };

  const callBackSuccess = (ordersProvider) => {
    setOrders(ordersProvider)
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  const [filter, setFilter] = React.useState({
    guideNumber: null
  });

  const callBack = (msg) => {
    setOrders({
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

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const filterTransactions = () => {
    setErrorMessage("")
    getOrdersForProvider("numbers", "")
  }

  const getOrdersForProvider = (filter, value) => {
    const merchantId = getMerchantId()
    let url = `${CORE_BASEURL}/order/provider?merchantId=${merchantId}&durationInDays=${duration}`
    if (document.getElementById("guideNumber").value) {
      url = `${url}&guideNumber=${document.getElementById("guideNumber").value}`
    }
    if (orderState > 0) {
      url = `${url}&orderState=${orderState}`
    }

    if (filter === 'changePage') {
      url = `${url}&pageNumber=${value}`
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

  const copyUrl = () => {
    var getUrl = window.location;
    var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
    navigator.clipboard.writeText(baseUrl + "proveedor?nombre=" + getMerchantName());
  }

  const classes = useStyles();

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const { ...rest } = props;

  return (
    <div>
      <ResponsiveDrawe />

      <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center" >


          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <br />
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12} sm={12} md={6} >
                Hola {getMerchantName()}, Bienvenido a MiPagoSeguro.
              </Grid>
              <Grid item xs={12} sm={12} md={6}><Button color="success" onClick={() => copyUrl()}>Copiar enlace de tienda</Button></Grid>
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
                    <MenuItem value={2}>En despacho</MenuItem>
                    <MenuItem value={3}>En entrega</MenuItem>
                    <MenuItem value={4}>Pago pendiente</MenuItem>
                    <MenuItem value={5}>Transferido</MenuItem>
                    <MenuItem value={6}>Entregado</MenuItem>
                    <MenuItem value={7}>Devolucion</MenuItem>
                    <MenuItem value={8}>Cancelado</MenuItem>
                    <MenuItem value={9}>Novedad</MenuItem>
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
                    <MenuItem value={0}>
                      <em>Ninguno</em>
                    </MenuItem>
                    <MenuItem value={1}>1 día</MenuItem>
                    <MenuItem value={2}>2 días</MenuItem>
                    <MenuItem value={7}>1 semana</MenuItem>
                    <MenuItem value={30}>1 mes</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} style={{ textAlign: "center" }}>
                <TextField onChange={handleChange} value={filter.guideNumber} inputProps={{ min: 0, id: 'guideNumber', name: 'guideNumber' }} type="number" style={{ width: "180px", backgroundColor: "white" }} id="outlined-basic" label="Número de guía" variant="outlined" required />
              </Grid>

              <Grid item xs={12} sm={12} md={6} style={{ textAlign: "center" }} ><Button color="primary" onClick={filterTransactions}> Filtrar</Button></Grid>
            
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item ><span>Ganancia de ordenes {orderState != 0 && orderState != -1 ? getOrderState(orderState) + 's' : ''}: </span> <br /><span className={classes.valueText}>{formatter.format(ordersProvider.totalProfitSaleByStatus)}</span></Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item ><span> Número de ordenes {orderState != 0 && orderState != -1 ? getOrderState(orderState) + 's' : ''}: </span> <br /><span className={classes.valueText}>{ordersProvider.totalOrderByStatus}</span></Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={4} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item >
                <span>Dinero de ordenes {orderState != 0 && orderState != -1 ? getOrderState(orderState) + 's' : ''}:</span> <br /><span className={classes.valueText}>{formatter.format(ordersProvider.totalOrderAmountByStatus)}</span>
              </Grid>
            </Grid>
          </GridItem>
          <Grid item xs={12} sm={12} md={4} className={classes.grid}>
            <Button  onClick={()=>history.push("/warranty")} color="primary">
              Crear orden de garantía
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={4} className={classes.grid}>
            <Button component="a" href={CORE_BASEURL + "/label/public/order/" + getMerchantId()} color="primary">
              Descargar rótulos pendientes
            </Button>
          </Grid>
          {selected.length > 0 ?
            <Grid item xs={12} sm={12} md={4} className={classes.grid}>
              <Button component="a" href={CORE_BASEURL + "/label/public/multiple/order/" + getMultipleOrdersString()} color="primary">
                Descargar rótulos seleccionados
              </Button>
            </Grid>
            : <span></span>
          }
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item xs={12}><h2>Ordenes</h2></Grid>
              <Grid item xs={12} >
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Nombre del Producto </TableCell>
                        <TableCell align="right">Nombre del cliente</TableCell>
                        <TableCell align="right">Precio de venta</TableCell>
                        <TableCell align="right">Estado</TableCell>
                        <TableCell align="right">Guía</TableCell>
                        <TableCell align="right">Rotulado</TableCell>
                        <TableCell align="right">Fecha de creación</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {ordersProvider.orders.map((row) => {
                        const isItemSelected = isSelected(row.orderId);
                        return (

                          <TableRow
                            onClick={(event) => handleClick(event, row.orderId)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            key={row.orderId}
                            selected={isItemSelected}
                          >
                            <TableCell align="right"><a target="_blank" href={`/order-detail/${row.orderId}`} style={{ cursor: "pointer" }}>{row.productName}</a></TableCell>
                            <TableCell align="right">{row.customerName}</TableCell>
                            <TableCell align="right">{formatter.format(row.sellPrice)}</TableCell>
                            <TableCell align="right">{getOrderState(row.orderState)}</TableCell>
                            <TableCell align="center">{row.guideNumber ? row.guideNumber : "Guía vacía"}</TableCell>
                            <TableCell align="center">{row.isLabeled ? "Si" : "No"}</TableCell>
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
                  <p style={{ float: 'left' }}>Página: {page}. Total registros: {ordersProvider.totalRecords ? ordersProvider.totalRecords : 15}</p>
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