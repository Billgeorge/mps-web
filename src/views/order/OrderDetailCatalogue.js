import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import Button from '@material-ui/core/Button';

import { CORE_BASEURL } from 'constant/index'
import { consumeServiceGet } from 'service/ConsumeService'
import { getIdFromUrl } from 'util/UrlUtil'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(styles);

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export default function OrderDetailCatalogue(props) {

  const [order, setOrder] = React.useState({
    items: []
  });

  const classes = useStyles();


  const callBackSuccessGet = (order) => {
    //order.creationDate = getLegibleDate(order.creationDate)
    setOrder(order)
  }

  const callBackError = () => {
    console.log('error error in get')
  }


  React.useEffect(() => getOrderDetail(), []);


  const getOrderDetail = () => {
    const id = getIdFromUrl()
    const url = `${CORE_BASEURL}/catalogue/order/seller/order-detail?id=${id}`
    consumeServiceGet(callBackError, callBackSuccessGet, url)
  }

  return (
    <div>
      <ResponsiveDrawe />
      <div className={classes.container}>
        <GridContainer className={classes.subContainer} justify="center">
          | <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item >
                <h3>Detalle de orden : </h3>
              </Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} className={classes.grid}>
            <Grid container className={classes.boxDetail} spacing={3}>
              <Grid item ><span>Total del pedido :</span> <br /><span className={classes.valueTextDetail}>{formatter.format(order.finalPrice)}</span></Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={6} className={classes.grid}>
            <Grid container className={classes.boxDetail} spacing={3}>
              <Grid item ><span>Nombre del cliente:</span> <br /><span className={classes.valueTextDetail}>{order.customerName}</span></Grid>
            </Grid>
          </GridItem>
        </GridContainer>
        <GridContainer className={classes.subContainer} justify="center">
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.box} spacing={3}>
              <Grid item >
                <h3>Productos de orden : </h3>
              </Grid>
            </Grid>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Cantidad </TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="center">Sku</TableCell>
                    <TableCell align="right">Precio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((row) => (
                    <TableRow key={row.orderId}>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.productName}</TableCell>
                      <TableCell align="right">{row.sku}</TableCell>
                      <TableCell align="right">{
                        formatter.format(row.price)
                      }</TableCell>                                                                                                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </GridItem>
          <GridItem xs={12} sm={12} md={12} className={classes.grid}>
            <Grid container className={classes.boxDetail} spacing={3} justify="center">
              <Button href="/orders-seller">Volver</Button>
            </Grid>
          </GridItem>
        </GridContainer>
      </div>
    </div>

  );
}