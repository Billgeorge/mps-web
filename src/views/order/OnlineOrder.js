import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControl from '@material-ui/core/FormControl';
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import consumeServicePost from 'service/ConsumeService'
import CircularProgress from '@material-ui/core/CircularProgress';
import GroupedButtons from 'views/Components/Numeric'
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { CORE_BASEURL } from 'constant/index'
import { consumeServiceGet } from 'service/ConsumeService'
import { getMerchantId } from 'service/AuthenticationService'
import Grid from '@material-ui/core/Grid';

import styles from "assets/jss/material-kit-react/views/createPayment.js";

import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles(styles);

export default function OnlineOrder(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [infoMessage, setInfoMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [citiesResponse, SetCitiesResponse] = React.useState([]);
    const [cities, SetCities] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [states, SetStates] = React.useState([]);

    const [onlineOrder, setOnlineOrder] = React.useState({
        name: "",
        email: "",
        neighborhood: "",
        contactNumber: "",
        address: "",
        city: "",
        state: "",
        product: "",
        quantity: 1
    });

    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();

    const history = useHistory();

    const handleChangeQuantity = (quantity) => {
        setErrorMessage("")
        setOnlineOrder({
            ...onlineOrder,
            quantity: quantity
        });
    };


    const callBackError = () => {
        setIsLoading(false)
        setErrorMessage("Error generando orden online. Contacte al administrador")
    }

    React.useEffect(() => { getCities() }, []);

    const getCities = () => {
        const url = `${CORE_BASEURL}/logistic/cities`
        const urlProducts = `${CORE_BASEURL}/dropshippingsale/sellermerchant/${getMerchantId()}`
        consumeServiceGet(callBackErrorGetProducts, callBackSuccessGetProducts, urlProducts)
        consumeServiceGet(callBackErrorGetCities, callBackSuccessGetCities, url)
    }

    const callBackErrorGetProducts = () => {
        setErrorMessage("Error obteniendo productos")
    }

    const callBackSuccessGetProducts = (products) => {
        setProducts(products)
    }

    const generateOnlineOrder = () => {
        if (isLoading) {
            return
        }
        setErrorMessage(null)
        if (!onlineOrder.name || !onlineOrder.neighborhood || !onlineOrder.email || !onlineOrder.contactNumber
            || !onlineOrder.address || !onlineOrder.city || !onlineOrder.state || !onlineOrder.product) {
            setErrorMessage("Todos los campos son obligatorios")
            return
        }
        setIsLoading(true)
        let url = `${CORE_BASEURL}/order/online-order`
        let request = {
            dropSaleId: onlineOrder.product,
            quantity: onlineOrder.quantity,
            merchantId: getMerchantId(),
            customer: {
                name: onlineOrder.name,
                email: onlineOrder.email,
                contactNumber: onlineOrder.contactNumber,
                address: onlineOrder.address,
                city: onlineOrder.city,
                neighborhood: onlineOrder.neighborhood,
                department: onlineOrder.state
            },
            observations: onlineOrder.observations
        }
        consumeServicePost(request, callBackError, callBackSuccess, url)
    }

    const callBackSuccess = () => {
        setIsLoading(false)
        setOnlineOrder({})
        setInfoMessage("Orden creada")
    }

    const callBackSuccessGetCities = (cities) => {
        SetCities(cities)
        SetCitiesResponse(cities)
        let states = []
        cities.forEach(record => {

            let actualState = record.state
            let exist = false
            states.forEach(state => {
                if (state === actualState) {
                    exist = true
                }
            })
            if (!exist) {
                states.push(actualState)
            }

        })
        SetStates(states)
    }

    const callBackErrorGetCities = () => {
        setErrorMessage("Error obteniendo ciudades")
    }

    const handleChange = (event) => {
        const name = event.target.name;
        setOnlineOrder({
            ...onlineOrder,
            [name]: event.target.value,
        });
    };

    const handleChangeState = (event) => {
        let value = event.target.value
        let newCities = citiesResponse.filter(record => record.state === value)
        setOnlineOrder({
            ...onlineOrder,
            city: "",
        })
        SetCities(newCities)
        setErrorMessage("")
        const name = event.target.name;
        setOnlineOrder({
            ...onlineOrder,
            city: "",
            [name]: event.target.value,
        });
    }


    return (

        <div>
            <ResponsiveDrawe />
            <div className={classes.container}>
                <Grid container justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                        <Card className={classes[cardAnimaton]}>

                            <CardHeader className={classes.cardHeader}>
                                <h3 style={{ fontWeight: "600" }}><ArrowBackIcon style={{
                                    color: "#9c27b0", textDecoration: "none",
                                    backgroundColor: "transparent", cursor: "pointer"
                                }} onClick={() => history.push('/dashboard-dropseller')} /> Crear orden Online</h3>
                            </CardHeader>
                            {isLoading
                                ? <GridItem xs={12} sm={12} md={12}><center><CircularProgress /></center></GridItem>
                                : <span></span>
                            }
                            <CardBody>
                                <FormControl style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} variant="outlined" className={classes.formControl}>
                                    <InputLabel>Producto</InputLabel>
                                    <Select
                                        native
                                        label="Producto"
                                        inputProps={{
                                            name: 'product',
                                            id: 'product'
                                        }}
                                        value={onlineOrder.product}
                                        onChange={handleChange}

                                    >
                                        <option aria-label="None" value="" />
                                        {
                                            products.map(function (product) {
                                                return <option value={product.id}>{product.name}</option>;
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <Grid container justify="center" style={{ marginTop: "30px", marginBottom: "30px" }}>
                                    <GridItem xs={6} sm={6} md={6} className={classes.detailText}> Cantidad </GridItem>
                                    <GridItem style={{ margin: "0 auto" }} xs={6} sm={6} md={6}> <GroupedButtons callback={handleChangeQuantity} counter={1}></GroupedButtons></GridItem>
                                </Grid>
                                <TextField name="name" id="name" value={onlineOrder.name} onChange={handleChange} style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} placeholder="Ejemplo: calle 34 # 1w-88 conjunto glacial torre 4 apto 303" label="Nombre completo Cliente" variant="outlined" required />
                                <FormControl style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} variant="outlined" className={classes.formControl}>
                                    <InputLabel>Departamento</InputLabel>
                                    <Select
                                        native
                                        label="Departamento"
                                        inputProps={{
                                            name: 'state',
                                            id: 'state'
                                        }}
                                        value={onlineOrder.state}
                                        onChange={handleChangeState}

                                    >
                                        <option aria-label="None" value="" />
                                        <option value="value">ciudad</option>
                                        {
                                            states.map(function (state) {
                                                return <option value={state}>{state}</option>;
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <FormControl style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} variant="outlined" className={classes.formControl}>
                                    <InputLabel>Ciudad</InputLabel>
                                    <Select
                                        native
                                        label="Ciudad"
                                        inputProps={{
                                            name: 'city',
                                            id: 'city'
                                        }}
                                        onChange={handleChange}
                                        value={onlineOrder.city}

                                    >

                                        <option aria-label="None" value="" />
                                        <option value="value">ciudad</option>
                                        {
                                            cities.map(function (item) {
                                                return <option value={item.code}>{item.city}</option>;
                                            })
                                        }
                                    </Select>
                                </FormControl>
                                <p>Ingresa la dirección completa del cliente</p>
                                <TextField name="address" id="address" value={onlineOrder.address} onChange={handleChange} style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} placeholder="Ejemplo: calle 34 # 1w-88 conjunto glacial torre 4 apto 303" label="Dirección Cliente" variant="outlined" required />
                                <TextField name="neighborhood" id="neighborhood" value={onlineOrder.neighborhood} onChange={handleChange} style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} placeholder="Barrio Benito Salas" label="Barrio Cliente" variant="outlined" required />
                                <TextField name="email" id="email" value={onlineOrder.email} onChange={handleChange} type="email" style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} placeholder="cliente@gmail.com" label="Email cliente" variant="outlined" required />
                                <TextField name="contactNumber" id="contactNumber" value={onlineOrder.contactNumber} type="number" onChange={handleChange} style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} placeholder="3134897500" label="Número de contacto Cliente" variant="outlined" required />
                                <FormControl style={{ width: "100%" }}>
                                    <TextField
                                        id="observations"
                                        name="observations"
                                        label="Observaciones del pedido (color,talla)"
                                        multiline
                                        rows={4}
                                        placeholder="Si necesitas poner el color, la talla o cualquier característica del producto. Escríbelo acá."
                                        variant="outlined"
                                        inputProps={{ maxLength: 1000 }}
                                        onChange={handleChange}
                                    />
                                </FormControl>

                                {errorMessage
                                    ? <Alert severity="error">{errorMessage}</Alert> : <span></span>
                                }
                                {infoMessage
                                    ? <Alert severity="success">{infoMessage}</Alert> : <span></span>
                                }
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button color="primary" size="lg" type="button" onClick={generateOnlineOrder}>
                                    Crear orden
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </Grid>
            </div>
            <Footer />
        </div>

    );
}