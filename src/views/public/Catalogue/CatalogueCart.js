import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import styles from "assets/jss/material-kit-react/views/checkout.js";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import Button from "components/CustomButtons/Button.js";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import { getQueyParamFromUrl } from 'util/UrlUtil'
import { CORE_BASEURL } from 'constant/index'
import Alert from '@material-ui/lab/Alert';
import consumeServicePost from 'service/ConsumeService'
import { useHistory } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(styles);
export default function CatalogueCart(props) {

    const classes = useStyles();
    const history = useHistory();
    const [orderProducts, setOrderProducts] = React.useState(props.orderProducts);
    const [customerName, setCustomerName] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const changeCustomerName = (event) => {
        setCustomerName(event.target.value);
    }

    const createOrder = () => {
        setErrorMessage("")
        if (orderProducts.length < 1) {
            setErrorMessage("Debes agregar productos al pedido")
            return
        }
        if (!customerName) {
            setErrorMessage("El nombre del comprador es obligatorio.")
            return
        }
        if (isLoading) {
            return
        }
        let request = {
            customerName: customerName,
            sellerId: getQueyParamFromUrl("id"),
            orderItems: orderProducts.map(
                function (orderItem) {
                    return {
                        quantity: orderItem.quantity,
                        price: orderItem.price,
                        productId: orderItem.id
                    }
                }
            )
        }
        const url = `${CORE_BASEURL}/catalogue/order`
        setIsLoading(true)
        consumeServicePost(request, callBackErrorCreateOrder, callBackSuccess, url)
    }

    const callBackErrorCreateOrder = () => {
        setIsLoading(false)
        setErrorMessage("Error creando orden.")
    }

    const callBackSuccess = (order) => {
        setIsLoading(false)
        history.push("/thanks-page")
    }

    const deleteItem = (id) => {
        let index = -1
        for (var i = 0; i < orderProducts.length; i++) {
            if (orderProducts[i].idToDelete === id) {
                index = i
            }
        }
        let localItems = orderProducts
        localItems.splice(index, 1)
        props.setOrderProducts([...localItems])
        setOrderProducts([...localItems])
    }

    return (
        <GridContainer className={classes.container} >
            <GridItem className={classes.sideSection} xs={12} sm={12} md={12} >

                <GridContainer justify="center">
                    <GridItem xs={3} sm={3} md={3}>
                        <h4 className={classes.shopName}>Cantidad</h4>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <h4 className={classes.shopName}>Producto</h4>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <h4 className={classes.shopName}>Precio</h4>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <h4 className={classes.shopName}>Eliminar</h4>
                    </GridItem>
                    {orderProducts.map(
                        function (item) {
                            return <>
                                <GridItem xs={3} sm={3} md={3}>
                                    <h4 className={classes.shopName}>{item.quantity}</h4>
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                    <h4 className={classes.shopName}>{item.name}</h4>
                                </GridItem>
                                <GridItem style={{ "display": "flex", "alignItems": "center" }} xs={3} sm={3} md={3}>
                                    <h4 className={classes.shopName}>{formatter.format(item.price)}</h4>
                                </GridItem>
                                <GridItem style={{ "display": "flex", "alignItems": "center" }} xs={3} sm={3} md={3}>
                                    <IconButton onClick={() => { deleteItem(item.idToDelete) }} style={{ "color": "#01015a" }} aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
                                </GridItem>
                            </>
                        }
                    )}
                    <GridItem xs={6} sm={6} md={6} style={{ textAlign: "center", fontWeight: "900" }}>
                        <h4 className={classes.detailText}>Total</h4>
                    </GridItem>
                    <GridItem xs={6} sm={6} md={6} style={{ textAlign: "center", fontWeight: "900" }}>
                        <h4 className={classes.detailText}>{formatter.format(orderProducts.reduce((partialSum, a) => partialSum + a.price * a.quantity, 0))}</h4>
                    </GridItem>

                    <br /> <br /> <br /> <br />
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                            <TextField onChange={changeCustomerName} value={customerName} name="name" style={{ width: "98%", backgroundColor: "white" }} id="outlined-basic" label="Nombre del comprador" variant="outlined" required />
                        </GridItem>
                    </GridContainer>
                    <GridItem xs={12} sm={12} md={12} className={classes.gridItemCard} >
                        <span>Al realizar la compra estás aceptando nuestros <a href="https://www.eikoos.com/terminos-y-condiciones/" target="_blank">términos y condiciones</a></span>
                    </GridItem>
                    {errorMessage != ""
                        ? <GridItem xs={12} sm={12} md={12} ><Alert severity="error">{errorMessage}</Alert></GridItem> : <span></span>
                    }
                    {isLoading
                        ? <GridItem xs={12} sm={12} md={12}><center><CircularProgress /></center></GridItem>
                        : <span></span>
                    }
                    <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
                        <Button onClick={createOrder} style={{ fontSize: "1.07em", fontWeight: "900", backgroundColor: "#3636c3", width: "280px" }} className={classes.buttonText} color="success" size="lg">
                            Crear pedido
                        </Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12} style={{ textAlign: "center" }}>
                        <Button onClick={() => { props.viewCatalogue() }} style={{ fontSize: "1.07em", fontWeight: "900", backgroundColor: "#3636c3", width: "280px" }} className={classes.buttonText} size="lg">
                            <ArrowBackIcon className={classes.arrow} onClick={() => { }} /> Volver al catálogo
                        </Button>
                    </GridItem>
                </GridContainer>
            </GridItem>
        </GridContainer>
    )

}