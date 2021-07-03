import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import OutlinedInput from '@material-ui/core/OutlinedInput';

import styles from "assets/jss/material-kit-react/views/createPayment.js";

import consumeServicePost from '../../service/ConsumeService'
import ResponsiveDrawe from "components/LeftMenu/ResponsiveDrawer.js"
import {getQueyParamFromUrl} from 'util/UrlUtil'

import { CORE_BASEURL } from 'constant/index'

const useStyles = makeStyles(styles);

export default function CreateInventory(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");

    const [errorMessage, setErrorMessage] = React.useState({});

    const [successMessage, setSuccessMessage] = React.useState("");

    const [isLoading, setIsLoading] = React.useState(false);
    

    setTimeout(function () {
        setCardAnimation("");
    }, 700);
    const classes = useStyles();

    const callBackSucess = () => {
        setSuccessMessage("Inventario creado")
        document.getElementById("createInventory").reset()
        setErrorMessage({})
        setIsLoading(false)
    }

    const callBack = (error) => {
        if (error != null && typeof error === 'object') {
          setErrorMessage(error)
        } else if (error != null && typeof error === 'String') {
          setErrorMessage({ 'Error': error })
        }
        else {
          setErrorMessage({ 'Error': 'Ha ocurrido un error inesperado por favor contactar al administrador' })
        }
        setIsLoading(false)
      }
    const createInventory = () => {
        if (document.getElementById("quantity").value > 0 && document.getElementById("email").value) {
            setIsLoading(true)
            let createInventoryRequest = {
                email: document.getElementById("email").value,
                quantity:document.getElementById("quantity").value,
                productId: getQueyParamFromUrl('idp')
            }
            consumeServicePost(createInventoryRequest, callBack, callBackSucess, `${CORE_BASEURL}/privateinventory`)
        } else {
            setErrorMessage({ 'Error': 'Todos los campos son obligatorios' })
        }
    }

    return (

        <div>
            <ResponsiveDrawe />
            <div className={classes.container}>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={6}>
                        <Card className={classes[cardAnimaton]}>

                            <form className={classes.form} validated="true" name="createInventory" id="createInventory">
                                <CardHeader className={classes.cardHeader}>
                                    <h3 style={{ fontWeight: "600" }}><a href="/product"><ArrowBackIcon /></a> Crear inventario privado</h3>
                                </CardHeader>
                                <CardBody>
                                    {isLoading
                                        ? <CircularProgress />
                                        : <span></span>
                                    }
                                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                                        <InputLabel htmlFor="quantity">Cantidad</InputLabel>
                                        <OutlinedInput
                                            id="quantity"
                                            placeholder="Cantidad de unidades"
                                            labelWidth={60}
                                            required
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormControl style={{ width: "100%", paddingBottom: "10px" }}>
                                        <InputLabel htmlFor="email">Email</InputLabel>
                                        <OutlinedInput
                                            id="email"
                                            placeholder="Email del vendedor"
                                            labelWidth={60}
                                            required
                                            type="email"
                                        />
                                    </FormControl>


                                    {Object.keys(errorMessage).map((keyName, i) => (
                                        <Alert severity="error">{keyName} : {errorMessage[keyName]}</Alert>
                                    ))}
                                    {successMessage
                                        ? <Alert severity="success">{successMessage}</Alert>
                                        : <span></span>
                                    }

                                </CardBody>
                                <CardFooter className={classes.cardFooter}>
                                    <Button color="primary" size="lg" onClick={createInventory}>
                                        Crear Inventario
                                    </Button>
                                </CardFooter>
                            </form>

                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
            <Footer />
        </div>

    );
}