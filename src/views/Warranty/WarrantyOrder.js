import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

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
import CustomInput from "components/CustomInput/CustomInput.js";
import { LocalShipping } from "@material-ui/icons";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { CORE_BASEURL } from 'constant/index'
import { consumeServiceGet } from 'service/ConsumeService'

import styles from "assets/jss/material-kit-react/views/createPayment.js";

import InputAdornment from '@material-ui/core/InputAdornment';
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { Checkbox } from "@material-ui/core";


const useStyles = makeStyles(styles);

export default function WarrantyOrder(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [infoMessage, setInfoMessage] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [changeAddress, setChangeAddress] = React.useState(false);
    const [pickUp, setPickUp] = React.useState(false);
    const [citiesResponse, SetCitiesResponse] = React.useState([]);
    const [cities, SetCities] = React.useState([]);
    const [states, SetStates] = React.useState([]);

    const [warrantyOrder, setWarrantyOrder] = React.useState({
        guideNumber: "",
        address: "",
        city: "",
        state: "",
        paymentResponsible: ""

    });

    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();

    const history = useHistory();


    const callBackError = () => {
        setIsLoading(false)
        setErrorMessage("Error generando garantía. Contacte al administrador")
    }

    React.useEffect(() => { getCities() });

    const getCities = () => {
        const url = `${CORE_BASEURL}/logistic/cities`
        consumeServiceGet(callBackErrorGetCities, callBackSuccessGetCities, url)
    }

    const generateWarrantyOrder = () => {
        if (isLoading) {
            return
        }
        if (!document.getElementById("guideNumber").value) {
            setErrorMessage("Número de guía es obligatorio");
            return;
        }
        if (changeAddress && (!warrantyOrder.state || !warrantyOrder.city || !warrantyOrder.address)) {
            setErrorMessage("Faltan campos obligatorios.");
            return;
        }
        setErrorMessage("");
        setIsLoading(true);
        const url = `${CORE_BASEURL}/order/warranty`
        let request = {}
        if (changeAddress) {
            request = {
                guideNumber: document.getElementById("guideNumber").value,
                pickup: pickUp,
                changeAddress: changeAddress,
                paymentResponsible: document.getElementById("paymentResponsible").value,
                state: document.getElementById("state").value,
                city: document.getElementById("city").value,
                address: document.getElementById("address").value
            }
        } else {
            request = {
                guideNumber: document.getElementById("guideNumber").value,
                pickup: pickUp,
                changeAddress: changeAddress,
                paymentResponsible: document.getElementById("paymentResponsible").value
            }
        }
        consumeServicePost(request, callBackError, callBackSuccess, url)
    }

    const callBackSuccess = () => {
        setWarrantyOrder({})
        setIsLoading(false)
        setInfoMessage("Solicitud creada")
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
        setWarrantyOrder({
            ...warrantyOrder,
            [name]: event.target.value,
        });
    };

    const handleChangeAddress = (event) => {
        setChangeAddress(event.target.checked);
    }

    const handlePickUp = (event) => {
        setPickUp(event.target.checked);
    }

    const handleChangeState = (event) => {
        let value = event.target.value
        let newCities = citiesResponse.filter(record => record.state === value)
        setWarrantyOrder({
            ...warrantyOrder,
            city: "",
        })
        SetCities(newCities)
        setErrorMessage("")
        const name = event.target.name;
        setWarrantyOrder({
            ...warrantyOrder,
            city: "",
            [name]: event.target.value,
        });
    }


    return (

        <div>
            <ResponsiveDrawe />
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                        <Card className={classes[cardAnimaton]}>

                            <CardHeader className={classes.cardHeader}>
                                <h3 style={{ fontWeight: "600" }}><ArrowBackIcon style={{
                                    color: "#9c27b0", textDecoration: "none",
                                    backgroundColor: "transparent", cursor: "pointer"
                                }} onClick={() => history.push('/dashboard-dropprovider')} /> Crear orden de garantía</h3>
                            </CardHeader>
                            {isLoading
                                ? <GridItem xs={12} sm={12} md={12}><center><CircularProgress /></center></GridItem>
                                : <span></span>
                            }
                            <CardBody>
                                <CustomInput
                                    labelText="Número de guía de orden original"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        type: "number",
                                        onChange: handleChange,
                                        value: warrantyOrder.guideNumber,
                                        id: "guideNumber",
                                        name: "guideNumber",
                                        required: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <LocalShipping className={classes.inputIconsColor} />
                                            </InputAdornment>
                                        )
                                    }}

                                />
                                <FormControlLabel style={{ paddingBottom: '10px' }}
                                    control={<Checkbox color="primary" name="checkedA" onChange={handlePickUp} checked={pickUp} />}
                                    label="¿Deseas que se recoja el producto enviado?"
                                />

                                <FormControl style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} variant="outlined" className={classes.formControl}>
                                    <TextField id="standard-basic" label="¿Quién paga los fletes?" />
                                    <Select
                                        native
                                        value={warrantyOrder.paymentResponsible}
                                        onChange={handleChange}
                                        name="paymentResponsible"
                                        label="Categoría producto"
                                        inputProps={{
                                            name: 'paymentResponsible',
                                            id: 'paymentResponsible'
                                        }}

                                    >

                                        <option value="1">Mi tienda</option>
                                        <option value="2">La tienda del vendedor</option>
                                    </Select>
                                </FormControl>
                                <FormControlLabel style={{ paddingBottom: '10px' }}
                                    control={<Checkbox color="primary" checked={changeAddress}
                                        onChange={handleChangeAddress} name="changeAddress" />}
                                    label="Cambiar dirección cliente"
                                />
                                {changeAddress ? <>
                                    <p>Ingresa la dirección donde se entregará y se recogerá (Si aplica) </p>
                                    <TextField name="address" id="address" value={warrantyOrder.address} onChange={handleChange} style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} placeholder="Ejemplo: calle 34 # 1w-88 conjunto glacial torre 4 apto 303" label="Dirección Cliente" variant="outlined" required />
                                    <FormControl style={{ width: "100%", backgroundColor: "white", paddingBottom: '10px' }} variant="outlined" className={classes.formControl}>
                                        <InputLabel>Departamento</InputLabel>
                                        <Select
                                            native
                                            label="Departamento"
                                            inputProps={{
                                                name: 'state',
                                                id: 'state'
                                            }}
                                            value={warrantyOrder.state}
                                            onChange={handleChangeState}

                                        >
                                            <option aria-label="None" value="" />
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
                                            value={warrantyOrder.city}

                                        >

                                            <option aria-label="None" value="" />
                                            {
                                                cities.map(function (item) {
                                                    return <option value={item.code}>{item.city}</option>;
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </> : <></>}
                                {errorMessage
                                    ? <Alert severity="error">{errorMessage}</Alert> : <span></span>
                                }
                                {infoMessage
                                    ? <Alert severity="success">{infoMessage}</Alert> : <span></span>
                                }
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button color="primary" size="lg" type="button" onClick={generateWarrantyOrder}>
                                    Crear orden
                                </Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            <Footer />
        </div>

    );
}