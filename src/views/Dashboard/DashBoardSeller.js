import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import IconButton from '@material-ui/core/IconButton';

import Alert from '@material-ui/lab/Alert';
import NavigateNextSharpIcon from '@material-ui/icons/NavigateNextSharp';
import NavigateBeforeSharpIcon from '@material-ui/icons/NavigateBeforeSharp';
import Button from "components/CustomButtons/Button.js";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Footer from "components/Footer/Footer.js";
import { getMerchantId, getMerchantName } from 'service/AuthenticationService';
import { getLegibleDate } from 'util/DateUtil'

import { consumeServiceGet } from 'service/ConsumeService'
import { CORE_BASEURL, getOrderState } from 'constant/index'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"


const useStyles = makeStyles(styles);



export default function DashboardSeller(props) {

    const [orderConsolidate, setOrderConsolidate] = React.useState({
        orderItems: [],
        totalAmountSold: 0,
        totalOrders: 0,
        totalProfit: 0,
        actualPage: 0,
        totalPages: 0
    });
    const [errorMessage, setErrorMessage] = React.useState("");
    const [confirmSuccessMessage, setConfirmSuccessMessage] = React.useState("");


    const [page, setPage] = React.useState(0);

    React.useEffect(() => getProductsForMerchant(), []);

    const handleNextPage = (event) => {
        console.log("page", page)
        setPage(page + 1);
        getProductsForMerchant('changePage', page + 1)
    };

    const handleBeforePage = (event) => {
        setPage(page - 1);
        getProductsForMerchant('changePage', page - 1)
    };

    const callBackSuccess = (orderConsolidate) => {
        setOrderConsolidate(orderConsolidate)
        setPage(orderConsolidate.actualPage)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const callBack = (msg) => {
        setOrderConsolidate({
            orderItems: [],
            totalAmountSold: 0,
            totalOrders: 0,
            totalProfit: 0,
            actualPage: 0,
            totalPages: 0
        })
        if (msg === 404) {
            setErrorMessage("No hay transacciones para mostrar")
        } else {
            setErrorMessage("Error Cargando Transacciones")
        }
    }

    const getProductsForMerchant = (filter, value) => {
        const merchantId = getMerchantId()
        let url = `${CORE_BASEURL}/catalogue/order/seller`

        if (filter === 'changePage') {
            url = `${url}?pageNumber=${value}`
        } else {
            url = `${url}?pageNumber=${page}`
        }

        consumeServiceGet(callBack, callBackSuccess, url)
    }

    const copyUrl = () => {
        var getUrl = window.location;
        var baseUrl = getUrl.protocol + "//" + getUrl.host + "/";
        navigator.clipboard.writeText(baseUrl + "catalogo?id=" + getMerchantId());
      }

    const classes = useStyles();


    return (
        <div>
            <ResponsiveDrawe />

            <div className={classes.container}>
                <GridContainer className={classes.subContainer} justify="center" >
                    <GridItem xs={12} sm={12} md={6} className={classes.grid}>
                        <Grid container className={classes.box} spacing={3}>
                            <Grid item xs={12} sm={12} md={6} style={{ textTransform: 'capitalize' }} >
                                Hola {getMerchantName()}, Bienvenido a EIKOOS.
                            </Grid>
                        </Grid>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} className={classes.grid}>
                        <Grid container className={classes.box} spacing={3}>
                            <Button color="success" onClick={() => copyUrl()}>Copiar enlace de catálogo</Button>
                        </Grid>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                        <Grid container className={classes.box} spacing={3}>
                            <Grid item ><span>Total monto órdenes :</span> <br /><span className={classes.valueText}>{formatter.format(orderConsolidate.totalAmountSold)}</span></Grid>
                        </Grid>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                        <Grid container className={classes.box} spacing={3}>
                            <Grid item ><span>Total utilidad bruta :</span> <br /><span className={classes.valueText}>{formatter.format(orderConsolidate.totalProfit)}</span></Grid>
                        </Grid>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} className={classes.grid}>
                        <Grid container className={classes.box} spacing={3}>
                            <Grid item ><span>Número de órdenes:</span> <br /><span className={classes.valueText}>{orderConsolidate.totalOrders}</span></Grid>
                        </Grid>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} className={classes.grid}>
                        <Grid container className={classes.box} spacing={1}>
                            <Grid item xs={12}><h2 style={{ fontWeight: "500" }} className={classes.title}>Pedidos del mes </h2></Grid>
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
                                                <TableCell align="right">Nombre Cliente </TableCell>
                                                <TableCell align="right">Monto de venta</TableCell>
                                                <TableCell align="center">Precio de compra</TableCell>
                                                <TableCell align="right">Fecha de creación</TableCell>
                                                <TableCell align="right">Estado</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {orderConsolidate.orderItems.map((row) => (
                                                <TableRow key={row.orderId}>
                                                    <TableCell align="right"><a target="_blank" href={`/order-detail/${row.id}`} style={{ cursor: "pointer" }}>{row.customerName}</a></TableCell>
                                                    <TableCell align="right">{formatter.format(row.finalPrice)}</TableCell>
                                                    <TableCell align="right">{formatter.format(row.costPrice)}</TableCell>
                                                    <TableCell align="right">{
                                                        getLegibleDate(row.creationDate)
                                                    }</TableCell>
                                                    <TableCell align="right">{row.state}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ float: 'left' }}>Página: {page}. Total registros: {orderConsolidate.totalOrders ? orderConsolidate.totalOrders : 25}</p>
                                    {
                                        page > 1 ? <IconButton onClick={handleBeforePage} aria-label="anterior">
                                            <NavigateBeforeSharpIcon />
                                        </IconButton> : <span></span>
                                    }

                                    {
                                        page < orderConsolidate.totalPages ? <IconButton onClick={handleNextPage} aria-label="siguiente">
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