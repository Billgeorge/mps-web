import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/DashBoard.js";
import { Pie } from 'react-chartjs-2'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { CORE_BASEURL, getOrderState } from 'constant/index'
import { consumeServiceGet } from 'service/ConsumeService'
import { getMerchantId } from 'service/AuthenticationService';
import Alert from '@material-ui/lab/Alert';
import Button from "components/CustomButtons/Button.js";
import { formatDate } from 'util/DateUtil'




const useStyles = makeStyles(styles);
export default function Results() {

    const classes = useStyles();
    const [errorMessage, setErrorMessage] = React.useState("");

    const [date, setMinDate] = React.useState("");
    

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const [dataChart, setDataChart] = React.useState({
        labels: ['En despacho', 'Entregado', 'En entrega'],
        datasets: [{
            data: [25, 35, 100],
            backgroundColor: ['green', 'red', 'blue']
        }]
    });

    const [dataPerLabel, setDataPerLabel] = React.useState([]);

    const [options, setOptions] = React.useState({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                display: true,
                color: 'black'
            }
        }
    });

    React.useEffect(() => getActualConsolidate(), []);

    const searchConsolidate = () => {
        setErrorMessage("")
        if (!document.getElementById('initialDate').value || !document.getElementById('finalDate').value) {
            setErrorMessage("Ambas fechas son obligatorias")
            return
        }
        const merchantId = getMerchantId()
        const initialDate = document.getElementById('initialDate').value
        const finalDate = document.getElementById('finalDate').value
        let url = `${CORE_BASEURL}/dropshippingsale/results/dropshippers?merchantId=${merchantId}&initialDate=${initialDate}&finalDate=${finalDate}`
        consumeServiceGet(callBack, callBackSuccess, url)
    }

    const getActualConsolidate = () => {
        const merchantId = getMerchantId()
        let url = `${CORE_BASEURL}/dropshippingsale/results/dropshippers?merchantId=${merchantId}&initialDate=${formatDate(new Date())}&finalDate=${formatDate(new Date())}`
        consumeServiceGet(callBack, callBackSuccess, url)
    }

    const buildChartData = (orders) => {
        const labels = []
        const data = []
        const colors = []
        const dataSets = []
        orders.forEach(order => {
            labels.push(getOrderState(order.status))
            data.push(order.quantity)
            colors.push(getRandomColor())
        })
        const dataSet = {
            data: data,
            backgroundColor: colors
        }
        dataSets.push(dataSet)
        const dataChart = {
            labels: labels,
            datasets: dataSets
        }
        setDataChart(dataChart)
    }

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const callBackSuccess = (orders) => {
        setDataPerLabel(orders)
        buildChartData(orders)
    }

    const callBack = (msg) => {
        setDataPerLabel([])
        setDataChart({})
        if (msg === 404) {
            setErrorMessage("No hay ordenes en ese periodo de tiempo")
        } else {
            setErrorMessage("Error Cargando Consolidado")
        }
    }

    const changeMinDate = (event) => {
        console.log("change initial date", event.target.value)
        document.getElementById('finalDate').value=null
        document.getElementById('finalDate').min = event.target.value
    }


    return (
        <div>
            <ResponsiveDrawe />
            <div className={classes.container}>
                <GridContainer className={classes.subContainer} justify="center" >

                    <GridItem xs={12} sm={12} md={12} className={classes.grid}>
                        <h1 style={{ color: 'black' }}>Tus resultados</h1>
                        <Grid container className={classes.box} spacing={3}>
                            <Grid item xs={12} sm={12} md={4} className={classes.grid} style={{ textAlign: 'center' }}>
                                <TextField
                                    id="initialDate"
                                    label="Fecha Inicial"
                                    type="date"
                                    onChange={changeMinDate}                                    
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} className={classes.grid} style={{ textAlign: 'center' }}>
                                <TextField
                                    id="finalDate"
                                    label="Fecha Final"
                                    type="date"                                    
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        min: {date}
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} className={classes.grid} style={{ textAlign: 'center' }}>
                                <Button color="primary" onClick={searchConsolidate}> Buscar</Button>
                            </Grid>
                        </Grid>
                        {errorMessage != ""
                            ?
                            <Alert severity="error">{errorMessage}</Alert>
                            : <span>	&nbsp;</span>
                        }
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} className={classes.grid}>
                        <div style={{ width: '100%', height: '500px', marginBottom: '0' }}>
                            <Pie data={dataChart} options={options} />
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} className={classes.grid}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Estado</TableCell>
                                        <TableCell align="right">Número de ordenes</TableCell>
                                        <TableCell align="right">Monto</TableCell>
                                        <TableCell align="right">Utilidad estimada</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataPerLabel.map((row) => (
                                        <TableRow>
                                            <TableCell align="right">{getOrderState(row.status)}</TableCell>
                                            <TableCell align="right">{row.quantity}</TableCell>
                                            <TableCell align="right">{formatter.format(row.totalAmount)}</TableCell>
                                            <TableCell align="right">{formatter.format(row.profit)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </GridItem>
                </GridContainer>

            </div>
        </div>
    )

}